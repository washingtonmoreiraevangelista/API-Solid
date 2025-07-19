import { InvalidCredentialError } from '@/errors/invalid-credential-error'
import { AuthenticateService } from '@/services/authenticate.service'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRepository } from '../in- memory/in-memory.repository'


let sut: AuthenticateService
let usersRepository: InMemoryRepository

describe('Authenticate Service', () => {

  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new AuthenticateService(usersRepository)

  })

  it('should be able to authenticate', async () => {

    await usersRepository.create({
      name: 'daia',
      email: 'daia@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'daia@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should be able to authenticate with wron email', async () => {


    await expect(() =>
      sut.execute({
        email: 'daia@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })



})