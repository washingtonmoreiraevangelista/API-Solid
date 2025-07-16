import { UsersRepository } from '@/repository/prisma-user.repository'
import { GetUserProfile} from '@/services/get-user-profile.service'

export function makeGetUserProfile() {

 const userRepository = new UsersRepository()
 const userGetProfile = new GetUserProfile(userRepository)
 
  return userGetProfile

}