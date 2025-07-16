import { registerUse } from '@/factories/make-register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


//  lida com request e resposta

// O controller recebe a requisição HTTP

// Valida os dados de entrada (com zod, por exemplo);

// Chama o service;

// Retorna a resposta para o cliente (reply.send()).

//acesso meio externo

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchena = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchena.parse(request.body)

  try {

    const service = registerUse()

    await service.createUser({
      name,
      email,
      password,
    }
    )

  } catch (error) {

    if (error instanceof ErrorEvent) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()


} 