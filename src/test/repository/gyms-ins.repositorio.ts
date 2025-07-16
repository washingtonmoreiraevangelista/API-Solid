import { Gym, Prisma } from '@prisma/client'
import { FindManyNearParams } from '@/interface/gyms'

export interface GymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearParams): Promise<Gym[]>

}