import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Update Employee (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update an employee', async () => {
    const createResponse = await request(app.server).post('/employees').send({
      name: 'Carlos',
      email: 'carlos@example.com',
    })

    const employeeId = createResponse.body.employee.id

    const updateResponse = await request(app.server)
      .put(`/employees/${employeeId}`)
      .send({
        name: 'Carlos Updated',
      })

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.body.employee).toEqual(
      expect.objectContaining({
        id: employeeId,
        name: 'Carlos Updated',
        email: 'carlos@example.com',
      }),
    )
  })
})
