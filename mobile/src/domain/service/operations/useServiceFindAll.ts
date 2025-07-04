import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { ServicePreview } from "../Service";

export function useServiceFindAll() {
  const { service } = useRepository();
  const { data, isLoading, error, refetch, setData } = useAppQuery<ServicePreview[]>(() => service.findAll());

  return {
    data,
    isLoading,
    error,
    refetch,
    setData
  };
} 