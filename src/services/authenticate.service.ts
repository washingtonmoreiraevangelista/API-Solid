import { InvalidCredentialError } from '@/errors/invalid-credential-error'
import { UsersRepository } from '@/repository/user.repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'


interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateService {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    // quando for boolean sempre escrever de forma semantica  'does','has', 'is'
    const isPasswordValid = await compare(password, user.password_hash)

    if (!isPasswordValid) {
      throw new InvalidCredentialError()
    }
    return {
      user,
    }

  }
}

// sempre começar pelo service pois consguimos realizar os teste unitarios 
