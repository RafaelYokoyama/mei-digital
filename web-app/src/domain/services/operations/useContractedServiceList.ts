import { useQuery } from '@tanstack/react-query'
import { api } from '@/infra/http/axios'

interface ContractedService {
  id: string
  serviceId: string
  name: string
  description: string
  price: number
  status: 'active' | 'pending' | 'completed'
  contractedAt: string
}

export function useContractedServiceList() {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['contracted-services'],
    queryFn: async () => {
      const { data } = await api.get<ContractedService[]>('/contracted-services')
      return data
    }
  })

  return {
    services,
    isLoading,
    error
  }
} 