import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { CheckinUser } from '@/services/check-ins.service'

export function makeCheckIn() {
  const checkRepository = new CheckinsRepository()
  const gymsRepository = new GymsRepository()

  const checkInService = new CheckinUser(checkRepository, gymsRepository)

  return checkInService
}
