import { PrismaBenefitsRepository } from '@/repositories/benefits/prisma-benefits-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


const benefitsRepo = new PrismaBenefitsRepository()

export async function createBenefit(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    value: z.number(),
  })

  const { name, value } = bodySchema.parse(request.body)

  const benefit = await benefitsRepo.create({ name, value })

  return reply.status(201).send({ benefit })
}

export async function listBenefits(request: FastifyRequest, reply: FastifyReply) {
  const benefits = await benefitsRepo.findAll()
  return reply.send({ benefits })
}

export async function getBenefit(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = request.params
  const benefit = await benefitsRepo.findById(id)

  if (!benefit) return reply.status(404).send({ message: 'Benefit not found' })

  return reply.send({ benefit })
}

export async function updateBenefit(
  request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; value?: number } }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const bodySchema = z.object({
    name: z.string().optional(),
    value: z.number().optional(),
  })

  const data = bodySchema.parse(request.body)

  const updatedBenefit = await benefitsRepo.update(id, data)

  return reply.send({ benefit: updatedBenefit })
}

export async function deleteBenefit(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = request.params

  await benefitsRepo.delete(id)

  return reply.status(204).send()
}
