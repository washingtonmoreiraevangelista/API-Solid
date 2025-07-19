import { FeatchSearchGyms } from '@/services/featch-nearbt-gyms.service'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../in- memory/in-memory-gyms.repository'

let gymsRepository: InMemoryGymsRepository
let sut: FeatchSearchGyms

describe('Fetch Nearby Gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FeatchSearchGyms(gymsRepository)

  })

  it('should be able to fetch nearby  gyms', async () => {

    await gymsRepository.create({
      title: 'near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'for Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,

    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'near Gym' }),
    ])
  })

})
