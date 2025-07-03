import { expect, describe, it, beforeEach } from 'vitest'
import { Service } from '../../services/user.service'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/test/test-unitario/memory.repository'
import { UserError } from '@/errors/user.error'

// test unitario: nunca deve depender de banco de dados ou api externa
// o teste deve ser isolado, não deve depender de banco de dados ou api externa

describe('User Service', () => {

  let service: Service

  beforeEach(() => {
    const usersRepository = new InMemoryRepository()
    service = new Service(usersRepository)
  })


  // teste se o usuário foi registrado corretamente
  it('should be able to register', async () => {

    const { user } = await service.createUser({
      name: 'Joh Doe',
      email: 'jog@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })


  // teste se a senha foi criptografada corretamente
  it('should hash password correctly', async () => {

    const { user } = await service.createUser({
      name: 'Joh Doe',
      email: 'jog@gmail.com',
      password: '123456'
    })

    const isPasswordHashed = await compare('123456', user.password_hash)
    expect(isPasswordHashed).toBe(true)
    console.log(user.password_hash

    )

  })


  // testar se o email já existe
  it('should not be able to register with same email twice', async () => {

    const email = 'jog@gmail.com'

    await service.createUser({
      name: 'Joh Doe',
      email,
      password: '123456'
    })

    // criar o usuário novamente com o mesmo email

    // await service.createUser({
    //   name: 'Joh Doe',
    //   email,
    //   password: '123456'
    // })

    await expect(
      service.createUser({
        name: 'Joh Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserError)

  })


})