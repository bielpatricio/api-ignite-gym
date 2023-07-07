import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: inMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Disneyland Paris Gym',
      description: null,
      phone: null,
      latitude: 48.8673858,
      longitude: 2.7810181,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'The best gym ever',
      phone: '83999999999',
      latitude: -7.1172327,
      longitude: -34.8293001,
    })

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym - ${i}`,
        description: null,
        phone: null,
        latitude: 48.8673858,
        longitude: 2.7810181,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym - 21',
      }),
      expect.objectContaining({
        title: 'TypeScript Gym - 22',
      }),
    ])
  })
})
