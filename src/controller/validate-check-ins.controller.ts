import { makeGetValidateCheckIn } from '@/factories/make-validate-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validateCheckiIns(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })


  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckIns = makeGetValidateCheckIn()

  await validateCheckIns.execute({
   checkInId,
  })

  return reply.status(204).send()


}