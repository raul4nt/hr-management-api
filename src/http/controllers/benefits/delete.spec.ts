import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Delete Benefit (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a benefit', async () => {
    const createResponse = await request(app.server).post('/benefits').send({
      name: 'New Benefit Name',
      value: 700,
    })

    const benefitId = createResponse.body.benefit.id

    const deleteResponse = await request(app.server).delete(`/benefits/${benefitId}`)

    expect(deleteResponse.statusCode).toBe(204)

    const findResponse = await request(app.server).get(`/benefits/${benefitId}`)

    expect(findResponse.statusCode).toBe(404)
  })
})
