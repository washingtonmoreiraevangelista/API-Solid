import { CheckIn, Prisma } from '@prisma/client'

export interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page:number): Promise<CheckIn[]>
}