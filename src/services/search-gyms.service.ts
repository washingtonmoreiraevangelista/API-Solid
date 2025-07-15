import { GymsRepository } from '@/repository/gyms.repository'
import { Gym } from '@prisma/client'

interface SearchGymsRequest {
  query: string
  page: number
}
interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor( private gymsRepository: GymsRepository) {}
  async execute({
    query,
    page

  }: SearchGymsRequest) {

    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    )

    return { gyms}
  }



}