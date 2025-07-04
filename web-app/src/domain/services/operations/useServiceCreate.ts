import { useMutation } from "@tanstack/react-query"
import { CreateServiceInput, Service } from "../Service"
import { useServiceRepository } from "@/infra/hooks/useServiceRepository"

export function useServiceCreate() {
  const repository = useServiceRepository()

  return useMutation<Service, Error, CreateServiceInput>({
    mutationFn: (input) => repository.create(input),
  })
} 