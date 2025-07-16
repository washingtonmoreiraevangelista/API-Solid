import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { CheckinUserRequest, CheckinUserResponse } from '@/interface/check-ins.interface'
import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { GymsRepository } from '@/repository/prisma-gyms.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'


export class CheckinUser {

  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUserRequest): Promise<CheckinUserResponse> {

    // check if gym exists
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    //calculate the distance between the user and the gym
    const distance = getDistanceBetweenCoordinates(
      // user coordinates
      { latitude: userLatitude, longitude: userLongitude },
      // gym coordinates
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    // vcheck if user has already checked in today
    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    // create check-in
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

