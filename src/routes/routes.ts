import { FastifyInstance } from 'fastify'
import { register } from '../controller/user.controller'
import { authenticate } from '@/controller/authenticate.controller'
import { profile } from '@/controller/profile.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'

export async function routes(app:FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  app.post('/register', register)
  app.post('/session', authenticate)
  app.get('/me',{onRequest:[verifyJWT]}, profile)

  
}