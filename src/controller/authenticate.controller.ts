import { InvalidCredentialError } from '@/errors/invalid-credential-error'
import { makeAuthenticate } from '@/factories/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  try {

    const service = makeAuthenticate()

    const { user } = await service.execute({
      email,
      password,
    })

    // gerar token, obs: não colocar senha ou dados sensiveis no token o payload nao e criptografado
    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id,
      },
    })

    return reply.status(200).send({
      token,
    })

  } catch (error) {

    if (error instanceof InvalidCredentialError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

} 