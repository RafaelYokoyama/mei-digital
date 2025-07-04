import { Button } from '@/components/layout/ui/button'
import Link from 'next/link'
import { ServiceForm } from '@/components/services/service-form'

export default function NewServicePage() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Novo Serviço</h1>
        <Button asChild variant='outline' size='lg' className='font-medium'>
          <Link href='/services'>Voltar para Serviços</Link>
        </Button>
      </div>

      <ServiceForm />
    </div>
  )
}
