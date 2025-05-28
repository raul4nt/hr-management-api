import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateEmployeeUseCase } from '@/use-cases/factories/make-create-employee-use-case'

interface MultipartRequest extends FastifyRequest {
  file?: {
    filename: string
  }
  body: any
}

export async function create(request: MultipartRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    positionId: z.string().uuid().optional(),
    benefitIds: z.array(z.string().uuid()).optional(),
  })

  const { name, email, positionId, benefitIds } = bodySchema.parse(request.body)

  const photoUrl = request.file?.filename

  const useCase = makeCreateEmployeeUseCase()

  const { employee } = await useCase.execute({
    name,
    email,
    position: positionId ? { connect: { id: positionId } } : undefined,
    photoUrl,
    benefitIds,
  })

  return reply.status(201).send({ employee })
}
