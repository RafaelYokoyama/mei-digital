'use client'

import { Service } from '@/domain/services/Service'
import { formatCurrency } from '@/lib/format'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/layout/ui/card'
import { Button } from '@/components/layout/ui/button'
import { useServiceContract } from '@/domain/services/operations/useServiceContract'
import { Alert } from '@/components/layout/ui/alert'
import { useState } from 'react'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { contractService, isContracting } = useServiceContract()
  const [error, setError] = useState<string | null>(null)

  const handleContract = async () => {
    try {
      await contractService(service)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao contratar serviço')
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <>
      {error && (
        <Alert
          variant='destructive'
          className='fixed bottom-4 right-4 max-w-md animate-in fade-in-0 slide-in-from-bottom-5 duration-300'
        >
          {error}
        </Alert>
      )}
      <Card className='flex flex-col h-[320px] bg-card hover:shadow-lg transition-all duration-200 hover:border-primary/20'>
        <CardHeader className='flex-none space-y-2.5 pb-4'>
          <div className='flex items-start justify-between gap-4'>
            <CardTitle className='text-xl leading-tight flex-1 line-clamp-2'>
              {service.name}
            </CardTitle>
            <div className='text-xl font-semibold text-primary whitespace-nowrap'>
              {formatCurrency(service.price)}
            </div>
          </div>
        </CardHeader>
        <CardContent className='flex-1'>
          <p className='text-muted-foreground leading-relaxed line-clamp-3'>
            {service.description}
          </p>
        </CardContent>
        <CardFooter className='flex-none pt-4 border-t'>
          <Button
            onClick={handleContract}
            disabled={isContracting}
            className='w-full font-medium bg-primary hover:bg-primary/90 text-white'
            size='lg'
          >
            {isContracting ? (
              <>
                <span className='animate-pulse'>Contratando</span>
                <span className='animate-bounce'>...</span>
              </>
            ) : (
              'Contratar Serviço'
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
