import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      email: "john@test.com",
      name: "John",
      password: "123456"
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = "john@prisma.com"

    await registerUseCase.execute({
      email,
      name: "John",
      password: "123456"
    })

    await expect(() => registerUseCase.execute({
      email,
      name: "John",
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able register a user', async () => {
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      email: "john@test.com",
      name: "John",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))
  })
})