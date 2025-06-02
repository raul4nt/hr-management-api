import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find All Benefits (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all benefits', async () => {
    await request(app.server).post('/benefits').send({
      name: 'Food Voucher',
      value: 500,
    })

    await request(app.server).post('/benefits').send({
      name: 'Gym Membership',
      value: 100,
    })

    const response = await request(app.server).get('/benefits')

    expect(response.statusCode).toBe(200)
    expect(response.body.benefits.length).toBeGreaterThanOrEqual(2)
    expect(response.body.benefits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Food Voucher', value: 500 }),
        expect.objectContaining({ name: 'Gym Membership', value: 100 }),
      ]),
    )
  })
})
