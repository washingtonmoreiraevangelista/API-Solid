import { SearchGyms } from '@/services/search-gyms.service'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../in- memory/in-memory-gyms.repository'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGyms

describe('Seacher Gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGyms(gymsRepository)

  })

  it('should be able to seacher for gyms', async () => {

    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.550520,
      longitude: -46.633308,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.550520,
      longitude: -46.633308,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,

    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.550520,
        longitude: -46.633308,
      })
    }


    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,

    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })


})
