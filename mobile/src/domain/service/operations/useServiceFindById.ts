import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { Service } from "../Service";

export function useServiceFindById(id: string) {
  const { service } = useRepository();

  return useAppQuery<Service | null>(() => service.findById(id), [id]);
} 