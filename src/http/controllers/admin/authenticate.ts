import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateAdminUseCase } from '@/use-cases/authenticate-admin'
import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const adminsRepository = new PrismaAdminsRepository()
  const authenticateUseCase = new AuthenticateAdminUseCase(adminsRepository)

  try {
    const { admin } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: 'admin',
      },
      {
        sign: {
          sub: admin.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: 'admin',
      },
      {
        sign: {
          sub: admin.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
