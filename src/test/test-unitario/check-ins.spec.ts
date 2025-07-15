import { CheckinUserService } from '@/services/check-ins.service'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '../in-memory-gyms.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { MaxDistanceError } from '@/errors/max-distance-error'


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinUserService
let gymsRepository: InMemoryGymsRepository

describe('Check-in user service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUserService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude:-49.6401091,
    })


    vi.useFakeTimers()
  })

  //limpas as datas falsas após cada teste
  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })


  it('should not be able to check in twice in the same day', async () => {
    await gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })

    vi.setSystemTime(new Date(2025, 6, 8, 8, 0, 0)) // 8 de julho

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in again on a different day', async () => {
    await gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })


    vi.setSystemTime(new Date(2025, 6, 8, 8, 0, 0)) // 8 de julho

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2025, 6, 9, 8, 0, 0)) // 9 de julho

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })


  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(-49.6401091),
    })


    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      userLatitude: -27.0000000,
      userLongitude: -49.0000000,
    })).rejects.toBeInstanceOf(MaxDistanceError)

  })

})


// Estagio TDD
//1-red causo o error
//2-green faço funcionar
//3-refactor refacotoro