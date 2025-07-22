import { makeGetUserMetrics } from '@/factories/make-get-user-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metricsCheckIns(request: FastifyRequest, reply: FastifyReply) {
 
  const fetchUserCheckIns = makeGetUserMetrics()

  const { checkInsCount } = await fetchUserCheckIns.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })

}
