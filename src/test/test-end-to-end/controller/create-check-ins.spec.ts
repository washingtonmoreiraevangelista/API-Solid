import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creat-and-authenticate-user-test'
import { prisma } from '@/lib/prisma'

describe('Create check ins (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar check ins
  it('Should be able to create check ins', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

   const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }
    })

    // cria o check in
    const profileResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
          latitude: -27.2092052,
          longitude: -49.6401091,
        })

    expect(profileResponse.statusCode).toEqual(201)
  })
})







