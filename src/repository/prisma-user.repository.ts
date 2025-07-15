import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// responsável por acessar e manipular os dados no banco de dado
// segue o padrão repository
// é uma camada de abstração entre a aplicação e o banco de dados
// permite que a lógica de acesso aos dados seja separada da lógica de negócio
// facilita a manutenção e testes da aplicação
// pode ser usado com qualquer banco de dados, não apenas com o Prisma
// caso queria trocar o banco de dados, basta trocar a implementação do repositório
// não precisa mudar a lógica de negócio da aplicação


export class PrismaUsersRepository {

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

}

