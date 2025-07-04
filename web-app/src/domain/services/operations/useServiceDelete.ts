import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/infra/http/axios'

export function useServiceDelete() {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteService, isPending } = useMutation({
    mutationFn: async (serviceId: string) => {
      await api.delete(`/contracted-services/${serviceId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracted-services'] })
    }
  })

  return {
    deleteService,
    isDeleting: isPending
  }
} 