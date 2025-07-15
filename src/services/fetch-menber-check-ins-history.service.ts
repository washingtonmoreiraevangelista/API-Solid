import { CheckinsRepository } from '@/repository/check-ins.repository'
import { CheckIn } from '@prisma/client'


interface FetchUserCheckInsRequest {
  userId: string
  page: number

}

interface CheckinUserResponse {
  checkIns: CheckIn[]
}

export class FetchCheckinUserService {

  constructor(
    private checkinsRepository: CheckinsRepository,
  ) { }

  async execute({ userId,page}: FetchUserCheckInsRequest): Promise<CheckinUserResponse> {

    
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }

  }
}

