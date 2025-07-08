import { PrismaUsersRepository } from '@/repository/prisma/prisma-user.repository'
import { AuthenticateService } from '@/services/authenticate.service'

export function makeAuthenticate() {

 const userRepository = new PrismaUsersRepository()
 const authenticateService = new AuthenticateService(userRepository)
 
  return authenticateService

}