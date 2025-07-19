import fastify from 'fastify'
import { setGlobalErrorHandler } from './errors/global.error'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { routes } from './routes/routes'

export const app = fastify()
app.register(fastifyJwt, {
secret: env.JWT_SECRET,
})


app.register(routes)


setGlobalErrorHandler(app)
