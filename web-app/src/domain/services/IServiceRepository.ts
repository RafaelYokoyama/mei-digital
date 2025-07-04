import { Service, CreateServiceInput, UpdateServiceInput } from "./Service"

export interface IServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service>
  create(data: CreateServiceInput): Promise<Service>
  update(id: string, data: UpdateServiceInput): Promise<Service>
  delete(id: string): Promise<void>
} 