import fastify from 'fastify'
import { setGlobalErrorHandler } from './errors/global.error'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { routes } from './routes/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(routes)


setGlobalErrorHandler(app)
