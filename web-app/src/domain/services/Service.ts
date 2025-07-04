export interface Service {
  id: string
  name: string
  description: string
  price: number
  createdAt: string
  updatedAt: string
}

export type CreateServiceInput = {
  name: string
  description: string
  price: number
}

export type UpdateServiceInput = Partial<CreateServiceInput> 