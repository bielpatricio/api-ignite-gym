import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Disneyland Paris Gym',
      description: null,
      phone: null,
      latitude: 48.8673858,
      longitude: 2.7810181,
    })

    await gymsRepository.create({
      title: 'Close Gym',
      description: 'The best gym ever',
      phone: '83999999999',
      latitude: -7.1065012,
      longitude: -34.8293022,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.1172327,
      userLongitude: -34.8355182,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Close Gym',
      }),
    ])
  })
})
