import { IServiceRepo } from "@/src/domain/service/IServiceRepo";
import { Service, ServicePreview } from "@/src/domain/service/Service";

const API_BASE_URL = "http://192.168.0.5:3001";

export class JsonServerServiceRepo implements IServiceRepo {
  update(id: string, service: Partial<Service>): Promise<Service> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<ServicePreview[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const services: Service[] = await response.json();
      
      return services.map((service) => ({
        id: service.id,
        name: service.name,
        price: service.price,
        category: service.category,
        image: service.image,
        provider: service.provider,
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  async findById(id: string): Promise<Service | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error("Failed to fetch service");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching service:", error);
      throw error;
    }
  }

  async create(service: Omit<Service, "id">): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create service");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }
}