import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Disneyland Paris Gym',
      description: 'The best gym ever',
      phone: null,
      latitude: 48.8673858,
      longitude: 2.7810181,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
