import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { Gym } from '@prisma/client'

interface FeatchSearchGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchSearchGymsResponse {
  gyms: Gym[]
}

// buscar academias próximas a uma localização geográfica
export class FetchSearchGyms {
  constructor(private gymsRepository: GymsRepository) { }
  async execute({
    userLatitude,
    userLongitude
  }: FeatchSearchGymsRequest): Promise<FeatchSearchGymsResponse> {

    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return { gyms }
  }



}