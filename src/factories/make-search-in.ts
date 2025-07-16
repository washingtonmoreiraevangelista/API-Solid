import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { SearchGyms } from '@/services/search-gyms.service'

export function makeSearchGyms() {

  const gymsRepository = new GymsRepository()
  const searchGyms = new SearchGyms(gymsRepository)

  return searchGyms

}