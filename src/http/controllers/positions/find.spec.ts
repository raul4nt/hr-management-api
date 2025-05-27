import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find Position (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a position by ID', async () => {
    const createResponse = await request(app.server).post('/positions').send({
      name: 'QA Engineer',
      salary: 5500,
    })

    const positionId = createResponse.body.position.id

    const findResponse = await request(app.server).get(`/positions/${positionId}`)

    expect(findResponse.statusCode).toBe(200)
    expect(findResponse.body.position).toEqual(
      expect.objectContaining({
        id: positionId,
        name: 'QA Engineer',
        salary: 5500,
      }),
    )
  })
})
