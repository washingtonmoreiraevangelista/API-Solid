import { GymsRepository } from '@/repository/gyms.repository'
import { GymRequest } from '@/interface/gyms'



export class CreateGymsService {

  constructor(
    private gymsRepository: GymsRepository
  ) { }


  async createGymsCase({
    title,
    description,
    phone,
    latitude,
    longitude }
    : GymRequest) {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }



}