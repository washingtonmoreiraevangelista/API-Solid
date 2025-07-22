import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh token (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar usuario
  it('Should be able to refresh token', async () => {

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
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error('Cookies not set from auth response')
    }
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])

  })

})