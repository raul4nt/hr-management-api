import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Delete Position (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a position', async () => {
    const createResponse = await request(app.server).post('/positions').send({
      title: 'Tester',
      salary: 5000,
    })

    const positionId = createResponse.body.position.id

    const deleteResponse = await request(app.server).delete(`/positions/${positionId}`)

    expect(deleteResponse.statusCode).toBe(204)

    const findResponse = await request(app.server).get(`/positions/${positionId}`)

    expect(findResponse.statusCode).toBe(404)
  })
})
