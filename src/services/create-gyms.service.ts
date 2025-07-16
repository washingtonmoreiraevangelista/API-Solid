import { GymRequest } from '@/interface/gyms'
import { GymsRepository } from '@/repository/prisma-gyms.repository'



export class CreateGyms {

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