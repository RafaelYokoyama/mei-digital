import { Service, ServicePreview } from "./Service";

export interface IServiceRepo {
  findAll(): Promise<ServicePreview[]>;
  findById(id: string): Promise<Service | null>;
  create(service: Omit<Service, "id">): Promise<Service>;
  update(id: string, service: Partial<Service>): Promise<Service>;
  delete(id: string): Promise<void>;
} 