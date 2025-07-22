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
    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
        },
      })

    // reflesh token
    const refleshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        },
      })

    // token de authenticação fica disponivel para o front acessar de forma visivel
    // refleshToken vai ser enviado via cookie evita ser acessado pelo front
    return reply
      .setCookie('refreshToken', refleshToken, {
        path: '/',
        // o front nao vai conseguir ler
        secure: true,
        // cookie so vai ser acessivel no mesmo site
        sameSite: true,
        // so vai ser acessado pelo back-end
        httpOnly: true
      })
      .status(200)
      .send({
        token,
      })

  } catch (error) {

    if (error instanceof InvalidCredentialError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

} 