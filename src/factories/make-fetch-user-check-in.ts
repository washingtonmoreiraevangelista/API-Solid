import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { FetchCheckinUser} from '@/services/fetch-menber-check-ins-history.service'

export function makeGetUserCheckInsHistory() {

 const checkInsrepositorio = new CheckinsRepository()
 const getUserCheckHistory = new FetchCheckinUser(checkInsrepositorio)
 
  return getUserCheckHistory

}