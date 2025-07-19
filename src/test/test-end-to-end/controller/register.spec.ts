import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar usuario
  it('Should be able to register', async () => {
    const response = await request(app.server)
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(201)
  })








})