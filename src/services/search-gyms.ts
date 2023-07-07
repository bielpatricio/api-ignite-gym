import { hash } from 'bcryptjs'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
