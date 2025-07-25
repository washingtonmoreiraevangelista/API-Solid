import { CreateGyms } from '@/services/create-gyms.service'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../in- memory/in-memory-gyms.repository'

let sut: CreateGyms
let gymsRepository: InMemoryGymsRepository

describe('Create Gyms Service', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGyms(gymsRepository)

  })


  it('should be able to create gym', async () => {

    const { gym } = await sut.createGymsCase({
      title: 'Gym 1',
      description: null,
      phone: null,
      latitude: -23.550520,
      longitude: -46.633308,

    })

    expect(gym.id).toEqual(expect.any(String))

  })


})