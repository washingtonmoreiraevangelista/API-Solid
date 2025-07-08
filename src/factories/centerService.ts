import { PrismaUsersRepository } from '@/repository/prisma/prisma-user.repository'
import { Service } from '@/services/register.service'

export function makeService() {

  const service = new Service(new PrismaUsersRepository())

  return service

}