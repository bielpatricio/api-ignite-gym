import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from "bcryptjs"
import { RegisterUseCase } from "@/services/register"
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from "@/services/errors/user-alredy-exists-error"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(201).send()
}