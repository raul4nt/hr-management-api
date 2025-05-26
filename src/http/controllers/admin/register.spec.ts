import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an admin', async () => {
    const response = await request(app.server).post('/admins').send({
      name: 'Admin Test',
      email: 'admin@test.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
