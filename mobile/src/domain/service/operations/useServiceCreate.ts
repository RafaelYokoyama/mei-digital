import { useAppMutation } from '@/src/infra/operations/useAppMutation';
import { useRepository } from '@/src/infra/repositories/RepositoryProvider';
import { Service } from '../Service';
import { useServiceFindAll } from './useServiceFindAll';

export function useServiceCreate() {
  const { service } = useRepository();
  const { data: currentServices, setData: setServices } = useServiceFindAll();

  return useAppMutation<Service, Omit<Service, 'id'>>({
    mutateFn: (serviceData) => service.create(serviceData),
    onSuccess: (newService) => {
      if (currentServices) {
        setServices([
          ...currentServices,
          {
            id: newService.id,
            name: newService.name,
            price: newService.price,
            category: newService.category,
            image: newService.image,
            provider: newService.provider,
          }
        ]);
      }
    },
  });
} 