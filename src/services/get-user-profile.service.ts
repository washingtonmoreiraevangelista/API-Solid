import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-user.repository'
import { User } from '@prisma/client'


interface GetUserProfileRequest {
userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileService {

  constructor(
    private usersRepository: PrismaUsersRepository
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

