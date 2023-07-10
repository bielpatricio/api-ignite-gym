import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Another way to create a gym if you didn't have this route yet
    const gym = await prisma.gym.create({
      data: {
        title: 'Typescript Gym',
        description: 'Gym to learn Typescript',
        phone: '83999999999',
        latitude: 48.8673858,
        longitude: 2.7810181,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym?.id}/check-ins`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        latitude: 48.8673858,
        longitude: 2.7810181,
      })

    expect(response.statusCode).toEqual(201)
  })
})
