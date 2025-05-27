import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find All Positions (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all positions', async () => {
    await request(app.server).post('/positions').send({
      title: 'Developer',
      salary: 7000,
    })

    await request(app.server).post('/positions').send({
      title: 'Designer',
      salary: 6000,
    })

    const response = await request(app.server).get('/positions')

    expect(response.statusCode).toBe(200)
    expect(response.body.positions.length).toBeGreaterThanOrEqual(2)
    expect(response.body.positions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Developer' }),
        expect.objectContaining({ title: 'Designer' }),
      ]),
    )
  })
})
