import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find Benefit (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a benefit by ID', async () => {
    const createResponse = await request(app.server).post('/benefits').send({
      name: 'Education Allowance',
      value: 900,
    })

    const benefitId = createResponse.body.benefit.id

    const findResponse = await request(app.server).get(`/benefits/${benefitId}`)

    expect(findResponse.statusCode).toBe(200)
    expect(findResponse.body.benefit).toEqual(
      expect.objectContaining({
        id: benefitId,
        name: 'Education Allowance',
        value: 900,
      }),
    )
  })
})
