import { UsersRepository } from '@/repository/prisma-user.repository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find(user => user.email === email)
    if (!user) {
      return null
    }
    return user
  }
  async findById(id: string) {
    const user = this.items.find(user => user.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }
    this.items.push(user)
    return user
  }


}