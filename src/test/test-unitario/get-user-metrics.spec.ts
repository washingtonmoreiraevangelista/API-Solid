import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../in-memory-check-ins.repository'
import { GetUserMetricsService } from '@/services/get-user-metrics.service'


let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get user metrics', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)

  })

  it('should be able to get cheking count metrics', async () => {

    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',

    })

    expect(checkInsCount).toEqual(2)
    console.log(checkInsCount)
  })

})
