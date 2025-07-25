import { FetchCheckinUser } from '@/services/fetch-menber-check-ins-history.service'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../in- memory/in-memory-check-ins.repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchCheckinUser

describe('Fetch heck-in history', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchCheckinUser(checkInsRepository)

  })

  it('should be able to fetch check in', async () => {

    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,

    })

    expect(checkIns).toHaveLength(2)

     expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check in', async () => {

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }


    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,

    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })


})
