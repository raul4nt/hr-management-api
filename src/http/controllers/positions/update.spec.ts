import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Update Position (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a position', async () => {
    const createResponse = await request(app.server).post('/positions').send({
      name: 'Developer',
      salary: 6000,
    })

    const positionId = createResponse.body.position.id

    const updateResponse = await request(app.server)
      .put(`/positions/${positionId}`)
      .send({
        name: 'Senior Developer',
        salary: 8000,
      })

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.body.position).toEqual(
      expect.objectContaining({
        id: positionId,
        name: 'Senior Developer',
        salary: 8000,
      }),
    )
  })
})
