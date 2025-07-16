import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { UsersRepository } from '@/repository/prisma-user.repository'
import { User } from '@prisma/client'


interface GetUserProfileRequest {
userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfile {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({ userId }: GetUserProfileRequest): Promise<GetUserProfileResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }

  }
}

