import Link from 'next/link'
import { Button } from '@/components/layout/ui/button'
import { Card, CardContent } from '@/components/layout/ui/card'

export function ServiceListEmpty() {
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
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </div>
        <h3 className='text-xl font-semibold text-foreground mb-2'>
          Nenhum serviço cadastrado
        </h3>
        <p className='text-foreground-secondary mb-6 max-w-sm'>
          Comece cadastrando seu primeiro serviço para expandir seu portfólio
        </p>
        <Button
          asChild
          className='bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-md'
        >
          <Link href='/services/new'>Cadastrar Serviço</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
