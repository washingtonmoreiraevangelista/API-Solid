import { FastifyInstance } from 'fastify'
import { register } from '../controller/user.controller'
import { authenticate } from '@/controller/authenticate.controller'

export async function appRoutes(app:FastifyInstance) {

  app.post('/register', register)
  app.post('/session', authenticate)

}