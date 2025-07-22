import { makeGetUserCheckInsHistory } from '@/factories/make-fetch-user-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function historyCheckIns(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistorySchema.parse(request.query)

  const fetchUserCheckIns = makeGetUserCheckInsHistory()

  const { checkIns } = await fetchUserCheckIns.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })

}
