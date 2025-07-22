import { makeFeatchNearbyGyms } from '@/factories/make-fetch-nearby-gyms'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsSchema.parse(request.query)

  const fetchNearbyGymsQuery = makeFeatchNearbyGyms()

  const { gyms } = await fetchNearbyGymsQuery.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })

}