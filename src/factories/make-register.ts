import { UsersRepository } from '@/repository/prisma-user.repository'
import { RegisterUser } from '@/services/register.service'

export function registerUse() {

  const UserRepository = new UsersRepository()
  const registerUser = new RegisterUser(UserRepository)

  return registerUser

}