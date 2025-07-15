import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { CheckinsRepository } from '@/repository/check-ins.repository'
import { GymsRepository } from '@/repository/gyms.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { CheckIn } from '@prisma/client'


interface CheckinUserRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUserResponse {
  checkIn: CheckIn
}

export class CheckinUserService {

  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUserRequest): Promise<CheckinUserResponse> {

    // verificar se academia existe
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    //calcular a distância entre o usuário e a academia

    const distance = getDistanceBetweenCoordinates(
      // coordenadas do usuário
      { latitude: userLatitude, longitude: userLongitude },
      // coordenadas da academia
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    if (checkInOnSameDate) {
      throw new Error()
    }

    return {
      checkIn,
    }

  }
}

