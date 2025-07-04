import { Alert } from '@/components/layout/ui/alert'

export function ServiceListError() {
  return (
    <Alert variant='destructive' className='mb-6'>
      Erro ao carregar serviços. Por favor, tente novamente.
    </Alert>
  )
}
