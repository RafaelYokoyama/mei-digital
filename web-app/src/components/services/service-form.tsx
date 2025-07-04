'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/layout/ui/card'
import { Button } from '@/components/layout/ui/button'
import { Alert } from '@/components/layout/ui/alert'
import { ServiceNameField } from './form/ServiceNameField'
import { ServicePriceField } from './form/ServicePriceField'
import { ServiceDescriptionField } from './form/ServiceDescriptionField'
import { useServiceForm } from '@/domain/services/operations/useServiceForm'
import { cn } from '@/lib/utils'

export function ServiceForm() {
  const {
    register,
    errors,
    error,
    isSubmitting,
    handlePriceChange,
    handleSubmit,
    watch
  } = useServiceForm()

  const priceValue = watch('price') || ''

  return (
    <Card
      className={cn(
        'max-w-2xl mx-auto bg-background rounded-xl shadow-lg border transition-colors duration-200',
        Object.keys(errors).length > 0
          ? 'border-destructive/50'
          : 'border-border'
      )}
    >
      <CardHeader className='p-6 border-b border-border space-y-1.5'>
        <CardTitle className='text-2xl font-bold tracking-tight'>
          Cadastrar Serviço
        </CardTitle>
        <CardDescription className='text-foreground-secondary'>
          Preencha as informações abaixo para cadastrar um novo serviço
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        {error && (
          <Alert
            variant='destructive'
            className='mb-6 animate-in fade-in-0 slide-in-from-top-2 duration-300'
          >
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <ServiceNameField
            {...register('name')}
            error={errors.name?.message}
          />

          <ServicePriceField
            value={priceValue}
            error={errors.price?.message}
            onChange={handlePriceChange}
          />

          <ServiceDescriptionField
            {...register('description')}
            error={errors.description?.message}
          />

          <div className='pt-4'>
            <Button
              type='submit'
              disabled={isSubmitting}
              size='lg'
              className={cn(
                'w-full font-medium transition-colors duration-200',

                'bg-red-600 hover:bg-red-700'
              )}
            >
              {isSubmitting ? (
                <>
                  <span className='animate-pulse'>Cadastrando</span>
                  <span className='animate-bounce'>...</span>
                </>
              ) : (
                'Cadastrar Serviço'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
