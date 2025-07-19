import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar usuario
  it('Should be able to get profile', async () => {

    // criar usuario
    await request(app.server)
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })

    // autenticar usuario
    const authResponse = await request(app.server)
      .post('/session')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })

    const { token } = authResponse.body

    // faço a chamada
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: 'johndoe@example.com',
        }),
      }),
    )
  })


})







