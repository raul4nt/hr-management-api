import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find All Employees (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all employees', async () => {
    await request(app.server).post('/employees').send({
      name: 'Alice Smith',
      email: 'alice@example.com',
    })

    await request(app.server).post('/employees').send({
      name: 'Bob Johnson',
      email: 'bob@example.com',
    })

    const response = await request(app.server).get('/employees')

    expect(response.statusCode).toBe(200)
    expect(response.body.employees.length).toBeGreaterThanOrEqual(2)
    expect(response.body.employees).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Alice Smith' }),
        expect.objectContaining({ name: 'Bob Johnson' }),
      ]),
    )
  })
})
