import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { ValidateUserService } from '@/services/validate-check-ins.service'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../in- memory/in-memory-check-ins.repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateUserService

describe('Validate Check-in user service', () => {
  beforeEach(async () => {

    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateUserService(checkInsRepository)

    vi.useFakeTimers()
  })

  //limpas as datas falsas após cada teste
  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to validate check in', async () => {

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should be able to inesti check in', async () => {
    expect(() => sut.execute({
      checkInId: 'non-existing-check-in-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })


    const twentyOneMinutesInMs = 1000 * 60 * 21
    // esperar 21 minutos
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect(() => sut.execute({
      checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(Error)

  })



})


