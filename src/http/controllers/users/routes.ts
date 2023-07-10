import { FastifyInstance } from 'fastify'
import { veirifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // Need be authenticated
  app.get('/me', { onRequest: [veirifyJWT] }, profile)
}
