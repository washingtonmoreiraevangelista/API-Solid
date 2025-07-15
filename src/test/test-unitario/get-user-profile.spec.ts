import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { GetUserProfileService } from '@/services/get-user-profile.service'
import { InMemoryRepository } from '@/test/in-memory.repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let sut: GetUserProfileService
let usersRepository: InMemoryRepository

describe('Get user profile ', () => {

  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new GetUserProfileService(usersRepository)

  })

  it('should be able to get profile', async () => {

    const creatUser = await usersRepository.create({
      name: 'daiane',
      email: 'daiane@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: creatUser.id,
    })

    expect(user.id).toEqual(expect.any(String))

  })


  it('should be able to get user profile with wrong id', async () => {


    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })



})