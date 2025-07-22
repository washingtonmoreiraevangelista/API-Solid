import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { FetchSearchGyms } from '@/services/featch-nearbt-gyms.service'

export function makeFeatchNearbyGyms() {

  const gymsRepository = new GymsRepository()
  const featchNearbyGyms = new FetchSearchGyms(gymsRepository)

  return featchNearbyGyms

}