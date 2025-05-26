import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an admin', async () => {
    await request(app.server).post('/admins').send({
      name: 'Admin Test',
      email: 'admin@test.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'admin@test.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
