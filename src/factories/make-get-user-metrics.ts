import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { GetUserMetricsService } from '@/services/get-user-metrics.service'

export function makeGetUserMetrics() {

 const checkInsrepositorio = new CheckinsRepository()
 const getUserMetrics = new GetUserMetricsService(checkInsrepositorio)
 
  return getUserMetrics

}