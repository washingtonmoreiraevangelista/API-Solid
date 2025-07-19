import { UserError } from '@/errors/user.error'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUser } from '../../../services/register.service'
import { InMemoryRepository } from '../in- memory/in-memory.repository'

// test unitario: nunca deve depender de banco de dados ou api externa
// o teste deve ser isolado, não deve depender de banco de dados ou api externa
//it.only permite que o teste seja executado isoladamente, sem executar os outros testes
//it.skip permite que o teste seja pulado, sem executá-lo

let sut: RegisterUser
let userRepository: InMemoryRepository

describe('User Service', () => {

  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new RegisterUser(userRepository)

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

  })


  // testar se o email já existe
  it('should not be able to register with same email twice', async () => {

    const email = 'jog@gmail.com'

    sut.createUser({
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