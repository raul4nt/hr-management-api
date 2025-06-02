import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Update Benefit (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a benefit', async () => {
    const createResponse = await request(app.server).post('/benefits').send({
      name: 'Education Allowance',
      value: 900,
    })

    const benefitId = createResponse.body.benefit.id

    const updateResponse = await request(app.server)
      .put(`/benefits/${benefitId}`)
      .send({
        name: 'Transportation Allowance',
        value: 500,
      })

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.body.benefit).toEqual(
      expect.objectContaining({
        id: benefitId,
        name: 'Transportation Allowance',
        value: 500,
      }),
    )
  })
})
