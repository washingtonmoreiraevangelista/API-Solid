import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { CreateGyms } from '@/services/create-gyms.service'

export function makeCreateGyms() {
  const gymsRepository = new GymsRepository()
  const createGyms = new CreateGyms(gymsRepository)
  return createGyms
}