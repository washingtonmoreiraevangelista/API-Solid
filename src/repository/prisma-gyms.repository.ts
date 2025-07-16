import { FindManyNearParams } from '@/interface/gyms'
import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'

export class GymsRepository {

  // create gym
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  // search gyms by ID
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      }
    })

    return gym
  }

  // search for gyms by name
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        }
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  // search for nearby gyms
  async findManyNearby(params: FindManyNearParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) 
    * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }

}