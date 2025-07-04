import { Input } from '@/components/layout/ui/input'
import { Label } from '@/components/layout/ui/label'
import { forwardRef } from 'react'

interface ServiceNameFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const ServiceNameField = forwardRef<
  HTMLInputElement,
  ServiceNameFieldProps
>(({ error, ...props }, ref) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor='name' className='font-medium'>
        Nome do Serviço
      </Label>
      <Input
        ref={ref}
        id='name'
        name='name'
        placeholder='Digite o nome do serviço'
        className={error ? 'border-destructive' : ''}
        {...props}
      />
      {error && (
        <p className='text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1'>
          {error}
        </p>
      )}
    </div>
  )
})

ServiceNameField.displayName = 'ServiceNameField'
