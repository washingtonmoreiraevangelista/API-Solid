import { UsersRepository } from '@/repository/prisma-user.repository'
import { AuthenticateService } from '@/services/authenticate.service'

export function makeAuthenticate() {

 const userRepository = new UsersRepository()
 const authenticateService = new AuthenticateService(userRepository)
 
  return authenticateService

}