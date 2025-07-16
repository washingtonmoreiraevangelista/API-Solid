import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { GetUserMetricsService } from '@/services/get-user-metrics.service'

export function makeGetValidateCheckIn() {

 const checkInsrepositorio = new CheckinsRepository()
 const getValidateCheckIn = new GetUserMetricsService(checkInsrepositorio)
 
  return getValidateCheckIn

}