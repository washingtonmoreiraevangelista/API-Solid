import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../in-memory-gyms.repository'
import { CreateGymsService } from '@/services/create-gyms.service'


let sut: CreateGymsService
let gymsRepository: InMemoryGymsRepository

describe('Create Gyms Service', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymsService(gymsRepository)

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