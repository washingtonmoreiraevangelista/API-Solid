import { FastifyInstance } from 'fastify'
import { register } from '../controller/user.controller'

export async function appRoutes(app:FastifyInstance) {

  app.post('/register', register)
  

}