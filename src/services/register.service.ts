import { User } from '@/interface/user'
import { hash } from 'bcryptjs'
import { UserError } from '@/errors/user.error'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-user.repository'


// 	Regras de negócio e lógica da aplicação

// Manipula dados

// Trata lógica específica da aplicação 

// Interage com o repositório (ou prisma)

// Decide o que acontece com os dados recebidos do controller.

export class Service {

  //inverte dependencia e poder migrar facilmente para outro banco de dados usamos classes com solid
  constructor(
    private usersRepository: PrismaUsersRepository
  ) { }


  async createUser({ name, email, password }: User) {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithSameEmail) {
      throw new UserError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return {user}
  }



}