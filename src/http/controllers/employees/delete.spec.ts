import { app } from '@/app'
import request from 'supertest'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Delete Employee (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete an employee', async () => {
    const createResponse = await request(app.server).post('/employees').send({
      name: 'Diana',
      email: 'diana@example.com',
    })

    const employeeId = createResponse.body.employee.id

    const deleteResponse = await request(app.server).delete(`/employees/${employeeId}`)

    expect(deleteResponse.statusCode).toBe(204)

    const findResponse = await request(app.server).get(`/employees/${employeeId}`)

    expect(findResponse.statusCode).toBe(404)
  })
})
