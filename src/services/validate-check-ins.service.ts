import { LateCheckInValidateError } from '@/errors/late-check-in-validate-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { CheckinsRepository } from '@/repository/prisma-check-ins.repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'


interface ValidateUserRequest {
  checkInId: string

}

interface ValidateUserResponse {
  checkIn: CheckIn
}

export class ValidateUserService {

  constructor(
    private checkinsRepository: CheckinsRepository,
  ) { }

  async execute({ checkInId }: ValidateUserRequest): Promise<ValidateUserResponse> {

    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    // diff server para comparar a data de criação do check-in com a data atual
    const distanceInMinutesFromCheckInCreation = dayjs(new Date())
      .diff(
        checkIn.createdAt,
        'minutes'
      )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return {
      checkIn
    }

  }
}

