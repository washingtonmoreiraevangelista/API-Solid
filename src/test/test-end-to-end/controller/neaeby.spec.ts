import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creat-and-authenticate-user-test'

describe('Nearby Gyms (e23)', () => {

  // antes de executar os testes o app esteja pronto
  beforeAll(async () => {
    await app.ready()
  })

  // depois de executar os testes aguardar a finalização
  afterAll(async () => {
    await app.close()
  })

  // criar academia
  it('Should be able to to list nearby gyms', async () => {

    const { token } = await createAndAuthenticateUser(app,true)

    // crio academia
    await request(app.server)
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

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          title: 'typescript Gym',
          description: 'Some description.',
          phone: '11999999999',
          latitude: -27.0610928,
          longitude: -49.5229501,
        },
      )


    const profileResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    //que seja um array
    expect(profileResponse.body.gyms).toHaveLength(1)
    //que seja um array contendo academia 
    expect(profileResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })

})







