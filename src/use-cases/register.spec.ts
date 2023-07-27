import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'john@test.com',
      name: 'John',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@prisma.com'

    await sut.execute({
      email,
      name: 'John',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'John',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able register a user', async () => {
    const { user } = await sut.execute({
      email: 'john@test.com',
      name: 'John',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
