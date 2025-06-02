import { FastifyInstance } from 'fastify'
import path from 'path'
import fs from 'fs'

export async function uploadRoutes(app: FastifyInstance) {
  app.register(require('@fastify/multipart'))

  app.post('/upload', async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ message: 'No file uploaded' })
    }

    const uploadPath = path.join(__dirname, '../../../uploads')
    fs.mkdirSync(uploadPath, { recursive: true })

    const filePath = path.join(uploadPath, `${Date.now()}-${data.filename}`)

    const writeStream = fs.createWriteStream(filePath)
    await data.file.pipe(writeStream)

    return {
      filename: data.filename,
      mimetype: data.mimetype,
      filePath,
    }
  })
}
