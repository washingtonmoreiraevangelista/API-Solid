import { FastifyInstance } from 'fastify'
import { register } from '../controller/user.controller'
import { authenticate } from '@/controller/authenticate.controller'
import { profile } from '@/controller/profile.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { search } from '@/controller/search.controller'
import { nearby } from '@/controller/nearby.controller'
import { create } from '@/controller/gyms.controller'
import { createCheckiIns } from '@/controller/create-check-ins.controller'
import { validateCheckiIns } from '@/controller/validate-check-ins.controller'
import { historyCheckIns } from '@/controller/history-check-ins.controller'
import { metricsCheckIns } from '@/controller/metrics-check-ins.controller'
import { refresh } from '@/controller/reflesh.controller'
import { verifyUserRole } from '@/middlewares/verify-user-role'

export async function routes(app: FastifyInstance) {
  // Rotas públicas
  app.patch('/token/refresh', refresh)
  app.post('/register', register)
  app.post('/sessions', authenticate)

  // Rotas protegidas
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  // Gyms
  app.get('/gyms/search', { onRequest: [verifyJWT] }, search)
  app.get('/gyms/nearby', { onRequest: [verifyJWT] }, nearby)
  app.post('/gyms', { onRequest: [verifyJWT, verifyUserRole('ADMIN')]}, create)

  // Check-ins
  app.get('/check-ins/history', { onRequest: [verifyJWT] }, historyCheckIns)
  app.get('/check-ins/metrics', { onRequest: [verifyJWT] }, metricsCheckIns)
  app.post('/gyms/:gymId/check-ins', { onRequest: [verifyJWT] }, createCheckiIns)
  app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, validateCheckiIns)
}
