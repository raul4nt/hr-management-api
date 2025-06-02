import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Create Benefit (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a benefit', async () => {
    const response = await request(app.server).post('/benefits').send({
      name: 'Health Insurance',
      value: 700,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.benefit).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Health Insurance',
        value: 700,
      }),
    )
  })
})
