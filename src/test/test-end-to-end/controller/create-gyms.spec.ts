import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creat-and-authenticate-user-test'

describe('Create Gyms (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar academia
  it('Should be able to create aa gym', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    // crio academia
    const profileResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          title: 'JavaScript Gym',
          description: 'Some description.',
          phone: '11999999999',
          latitude: -27.2092052,
          longitude: -49.6401091,
        },
      )

    expect(profileResponse.statusCode).toEqual(201)
  })
})







