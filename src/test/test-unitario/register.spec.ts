import { UserError } from '@/errors/user.error'
import { InMemoryRepository } from '@/test/memory.repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { Service } from '../../services/register.service'

// test unitario: nunca deve depender de banco de dados ou api externa
// o teste deve ser isolado, não deve depender de banco de dados ou api externa
//it.only permite que o teste seja executado isoladamente, sem executar os outros testes
//it.skip permite que o teste seja pulado, sem executá-lo

let sut: Service
let usersRepository: InMemoryRepository

describe('User Service', () => {

  let service: Service

  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new Service(usersRepository)

  })


  // teste se o usuário foi registrado corretamente
  it('should be able to register', async () => {

    const { user } = await sut.createUser({
      name: 'Joh Doe',
      email: 'jog@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })


  // teste se a senha foi criptografada corretamente
  it('should hash password correctly', async () => {

    const { user } = await sut.createUser({
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

    await sut.createUser({
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

    //sempre que usar expect usar await 
    await expect(
      sut.createUser({
        name: 'Joh Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserError)

  })


})