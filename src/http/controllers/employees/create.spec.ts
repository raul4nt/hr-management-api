import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Create Employee (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an employee', async () => {
    const response = await request(app.server).post('/employees').send({
      name: 'John Employee',
      email: 'john@example.com',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.employee).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Employee',
        email: 'john@example.com',
      }),
    )
  })
})
