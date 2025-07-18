import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckinsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }
    return checkIn
  }

  // criar um checkin
  async findByUserIdOnDate(userId: string, date: Date) {

    // dia inicial
    const startOfTheDay = dayjs(date).startOf('date')
    // dia final
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)

      // verificar se o checkIn está entre o dia inicial e o dia final
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      // verificar se o checkIn é do mesmo usuário
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  // encontrar todos os checkins do usuário
  async findManyByUserId(userId: string, page: number) {
    return this.items.filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  // contar os checkins do usuário
  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  // criar um novo checkin
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {

    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn

  }

}