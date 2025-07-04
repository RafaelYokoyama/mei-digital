'use client'

import { useContractedServiceList } from '@/domain/services/operations/useContractedServiceList'
import { useServiceDelete } from '@/domain/services/operations/useServiceDelete'
import { ServiceListSkeleton } from './service-list-skeleton'
import { ServiceListError } from './service-list-error'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/layout/ui/card'
import { Button } from '@/components/layout/ui/button'
import { formatCurrency } from '@/lib/format'
import { Badge } from '@/components/layout/ui/badge'
import { Alert } from '@/components/layout/ui/alert'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/layout/ui/dialog'

export function ContractedServiceList() {
  const { services, isLoading, error } = useContractedServiceList()
  const { deleteService, isDeleting } = useServiceDelete()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  if (isLoading) {
    return <ServiceListSkeleton />
  }

  if (error) {
    return <ServiceListError />
  }

  if (!services?.length) {
    return (
      <Card className='bg-background-secondary/50 border-2 border-dashed border-border/60 rounded-xl p-12 text-center'>
        <CardContent className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
            <svg
              className='w-6 h-6 text-primary'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-foreground mb-2'>
            Nenhum serviço contratado
          </h3>
          <p className='text-foreground-secondary mb-6 max-w-sm'>
            Explore os serviços disponíveis e contrate o que melhor atender suas
            necessidades
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleDelete = async (serviceId: string) => {
    try {
      await deleteService(serviceId)
      setServiceToDelete(null)
    } catch (err) {
      console.error('Error deleting service:', err)
      setErrorMessage('Erro ao excluir serviço. Por favor, tente novamente.')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  return (
    <>
      {errorMessage && (
        <Alert
          variant='destructive'
          className='fixed bottom-4 right-4 max-w-md animate-in fade-in-0 slide-in-from-bottom-5 duration-300'
        >
          {errorMessage}
        </Alert>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((service) => (
          <Card
            key={service.id}
            className='flex flex-col h-[320px] bg-card hover:shadow-lg transition-all duration-200 hover:border-primary/20'
          >
            <CardHeader className='flex-none space-y-2.5 pb-4'>
              <div className='flex items-start justify-between gap-4'>
                <CardTitle className='text-xl leading-tight flex-1 line-clamp-2'>
                  {service.name}
                </CardTitle>
                <div className='text-xl font-semibold text-primary whitespace-nowrap'>
                  {formatCurrency(service.price)}
                </div>
              </div>
              <Badge
                variant={
                  service.status === 'active'
                    ? 'success'
                    : service.status === 'pending'
                      ? 'warning'
                      : 'default'
                }
                className='w-fit text-xs px-2.5 py-0.5 capitalize'
              >
                {service.status === 'active'
                  ? 'Ativo'
                  : service.status === 'pending'
                    ? 'Pendente'
                    : 'Concluído'}
              </Badge>
            </CardHeader>
            <CardContent className='flex-1'>
              <p className='text-muted-foreground leading-relaxed line-clamp-3'>
                {service.description}
              </p>
              <p className='text-sm text-muted-foreground/80 mt-4'>
                Contratado em{' '}
                {new Date(service.contractedAt).toLocaleDateString('pt-BR')}
              </p>
            </CardContent>
            <CardFooter className='flex-none pt-4 border-t'>
              {service.status === 'active' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='destructive'
                      size='lg'
                      className='w-full font-medium'
                    >
                      Excluir Serviço
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='text-xl'>
                        Excluir Serviço
                      </DialogTitle>
                      <DialogDescription className='text-base pt-2'>
                        Tem certeza que deseja excluir o serviço &ldquo;
                        {service.name}&rdquo;?
                        <br />
                        <span className='text-destructive font-medium'>
                          Esta ação não pode ser desfeita e o serviço será
                          removido da sua lista.
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='sm:justify-start gap-3 pt-4'>
                      <Button
                        variant='destructive'
                        size='lg'
                        onClick={() => handleDelete(service.id)}
                        disabled={isDeleting && serviceToDelete === service.id}
                        className='font-medium'
                      >
                        {isDeleting && serviceToDelete === service.id ? (
                          <>
                            <span className='animate-pulse'>Excluindo</span>
                            <span className='animate-bounce'>...</span>
                          </>
                        ) : (
                          'Sim, excluir serviço'
                        )}
                      </Button>
                      <DialogClose asChild>
                        <Button
                          variant='outline'
                          size='lg'
                          className='font-medium'
                        >
                          Não, manter serviço
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
