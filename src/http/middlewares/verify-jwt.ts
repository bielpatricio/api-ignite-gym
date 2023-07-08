import { FastifyRequest, FastifyReply } from 'fastify'

export async function veirifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({
      message: 'Unauthorized.',
    })
  }
}
