import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.user).toHaveProperty('email')
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'JohnSnow@gameofthrones.com',
      }),
    )
  })
})
