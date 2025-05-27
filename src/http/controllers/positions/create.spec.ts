import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Create Position (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a position', async () => {
    const response = await request(app.server).post('/positions').send({
      name: 'Developer',
      salary: 8000,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.position).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Developer',
        salary: 8000,
      }),
    )
  })
})
