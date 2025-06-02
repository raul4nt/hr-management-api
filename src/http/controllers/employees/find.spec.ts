import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Find Employee (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find an employee by ID', async () => {
    const createResponse = await request(app.server).post('/employees').send({
      name: 'Jane Doe',
      email: 'jane@example.com',
    })

    const employeeId = createResponse.body.employee.id

    const findResponse = await request(app.server).get(
      `/employees/${employeeId}`,
    )

    expect(findResponse.statusCode).toBe(200)
    expect(findResponse.body.employee).toEqual(
      expect.objectContaining({
        id: employeeId,
        name: 'Jane Doe',
        email: 'jane@example.com',
      }),
    )
  })
})
