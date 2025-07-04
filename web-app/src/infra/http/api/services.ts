import { Service } from '@/domain/services/Service'
import { api } from '../axios'

export interface CreateServiceDTO {
  name: string
  description: string
  price: number
}

export class ServicesAPI {
  static async create(data: CreateServiceDTO): Promise<Service> {
    const response = await api.post('/services', data)
    return response.data
  }

  static async findAll(): Promise<Service[]> {
    const response = await api.get('/services')
    return response.data
  }

  static async findById(id: string): Promise<Service> {
    const response = await api.get(`/services/${id}`)
    return response.data
  }

  static async update(id: string, data: Partial<CreateServiceDTO>): Promise<Service> {
    const response = await api.patch(`/services/${id}`, data)
    return response.data
  }

  static async delete(id: string): Promise<void> {
    await api.delete(`/services/${id}`)
  }
} 