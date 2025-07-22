import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { ValidateUserService } from '@/services/validate-check-ins.service'

export function makeGetValidateCheckIn() {

 const checkInsrepositorio = new CheckinsRepository()
 const getValidateCheckIn = new ValidateUserService(checkInsrepositorio)
 
  return getValidateCheckIn

}