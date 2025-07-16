import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

export class CheckinsRepository {

  // create new checkin // INFERENCIA É O TIPO DE RETORNO DA FUNÇÃO
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  //check if there is a check-in from a specific user on a given day
  async findByUserIdOnDate(userId: string, date: Date) {

    // day initial
    const startOfTheDay = dayjs(date).startOf('date')
    // final day
    const endOfTheDay = dayjs(date).endOf('date')

    // verifica um unico checkin usar findFirst
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  // find all user checkins
  async findManyByUserId(userId: string, page: number) {
    const checkins = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkins
  }

  // count user checkins
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }

  // find a checkin by id
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })
    
    return checkIn
  }

  // update a checkin
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }

}