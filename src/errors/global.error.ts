import { env } from '@/env'
import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod/dist/types/v3/ZodError'

export function setGlobalErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    console.error(error)

    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({
          message: 'Validation error',
          issues: error.format(),
        })
    }

    if (env.NODE_ENV === 'production') {
      console.error(error)
    } else {
    }

    return reply.status(500).send({
      message: 'Internal server error',
    })
  })
}