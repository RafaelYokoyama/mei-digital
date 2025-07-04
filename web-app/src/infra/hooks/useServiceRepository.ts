import { IServiceRepository } from "@/domain/services/IServiceRepository"
import { JsonServerServiceRepository } from "../repositories/JsonServerServiceRepository"

export function useServiceRepository(): IServiceRepository {
  return new JsonServerServiceRepository()
} 