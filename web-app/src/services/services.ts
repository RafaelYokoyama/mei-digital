import { http } from "@/lib/http"
import { API_ENDPOINTS } from "@/config/api"

export interface Service {
  id: string
  title: string
  description: string
  price: number
  category: string
  userId: string
}

export interface CreateServiceData {
  title: string
  description: string
  price: number
  category: string
  userId: string
}

class ServicesService {
  private static instance: ServicesService

  private constructor() {}

  static getInstance(): ServicesService {
    if (!ServicesService.instance) {
      ServicesService.instance = new ServicesService()
    }
    return ServicesService.instance
  }

  async findAll(): Promise<Service[]> {
    try {
      const { data } = await http.get<Service[]>(API_ENDPOINTS.services.list)
      return data
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao buscar serviços")
    }
  }

  async findById(id: string): Promise<Service> {
    try {
      const { data } = await http.get<Service>(API_ENDPOINTS.services.detail(id))
      return data
    } catch (error) {
      console.log(error)
      throw new Error("Serviço não encontrado")
    }
  }

  async create(data: CreateServiceData): Promise<Service> {
    try {
      const response = await http.post<Service>(API_ENDPOINTS.services.create, data)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao criar serviço")
    }
  }

  async update(id: string, data: Partial<CreateServiceData>): Promise<Service> {
    try {
      const response = await http.patch<Service>(
        API_ENDPOINTS.services.update(id),
        data
      )
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao atualizar serviço")
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await http.delete(API_ENDPOINTS.services.delete(id))
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao excluir serviço")
    }
  }
}

export const servicesService = ServicesService.getInstance() 