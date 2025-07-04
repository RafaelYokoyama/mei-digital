import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/infra/http/axios'
import { Service } from '../Service'

interface ContractedService {
  id: string
  serviceId: string
  name: string
  description: string
  price: number
  status: 'active' | 'pending' | 'completed'
  contractedAt: string
}

export function useServiceContract() {
  const queryClient = useQueryClient()

  const { mutateAsync: contractService, isPending } = useMutation({
    mutationFn: async (service: Service) => {
      const { data: existingServices } = await api.get<ContractedService[]>('/contracted-services')
      
      if (existingServices.some(s => s.serviceId === service.id)) {
        throw new Error('Este serviço já foi contratado.')
      }

      await api.post('/contracted-services', {
        id: Date.now().toString(),
        serviceId: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        status: 'active',
        contractedAt: new Date().toISOString()
      })
    },
    onSuccess: () => {
 
      queryClient.invalidateQueries({ queryKey: ['services'] })
      queryClient.invalidateQueries({ queryKey: ['contracted-services'] })
    }
  })

  return {
    contractService,
    isContracting: isPending
  }
} 