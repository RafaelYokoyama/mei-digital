import { useQuery } from '@tanstack/react-query'
import { useServiceRepository } from '@/infra/hooks/useServiceRepository'

export function useServiceList() {
  const repository = useServiceRepository()
  
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => repository.findAll()
  })

  return {
    services,
    isLoading,
    error
  }
} 