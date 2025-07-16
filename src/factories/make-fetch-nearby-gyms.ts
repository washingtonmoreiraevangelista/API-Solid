import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { FeatchSearchGyms } from '@/services/featch-nearbt-gyms.service'
import { SearchGyms } from '@/services/search-gyms.service'

export function makeFeatchNearbyGyms() {

  const gymsRepository = new GymsRepository()
  const featchNearbyGyms = new FeatchSearchGyms(gymsRepository)

  return featchNearbyGyms

}