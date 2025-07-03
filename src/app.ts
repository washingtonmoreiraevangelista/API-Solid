import fastify from 'fastify'
import { appRoutes } from './routes/routes'
import { setGlobalErrorHandler } from './errors/global.error'

export const app = fastify()


app.register(appRoutes)

setGlobalErrorHandler(app)
