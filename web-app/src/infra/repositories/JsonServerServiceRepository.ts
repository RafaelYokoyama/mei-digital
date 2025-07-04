import { Service } from '@/domain/services/Service'
import { IServiceRepository } from '@/domain/services/IServiceRepository'
import { ServicesAPI, CreateServiceDTO } from '../http/api/services'

export class JsonServerServiceRepository implements IServiceRepository {
  async create(data: CreateServiceDTO): Promise<Service> {
    return ServicesAPI.create(data)
  }

  async findAll(): Promise<Service[]> {
    return ServicesAPI.findAll()
  }

  async findById(id: string): Promise<Service> {
    return ServicesAPI.findById(id)
  }

  async update(id: string, data: Partial<CreateServiceDTO>): Promise<Service> {
    return ServicesAPI.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return ServicesAPI.delete(id)
  }
} 