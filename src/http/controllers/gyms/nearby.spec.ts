import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Close Gym',
        description: 'The best gym ever',
        phone: '83999999999',
        latitude: -7.1065012,
        longitude: -34.8293022,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Disneyland Paris Gym',
        description: null,
        phone: null,
        latitude: 48.8673858,
        longitude: 2.7810181,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -7.1065012,
        longitude: -34.8293022,
        page: 1,
      })
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Close Gym',
      }),
    ])
  })
})
