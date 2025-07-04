import { Label } from '@/components/layout/ui/label'
import { Textarea } from '@/components/layout/ui/textarea'
import { forwardRef } from 'react'

interface ServiceDescriptionFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const ServiceDescriptionField = forwardRef<
  HTMLTextAreaElement,
  ServiceDescriptionFieldProps
>(({ error, ...props }, ref) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor='description' className='font-medium'>
        Descrição do Serviço
      </Label>
      <Textarea
        ref={ref}
        id='description'
        name='description'
        placeholder='Digite uma descrição para o serviço'
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

ServiceDescriptionField.displayName = 'ServiceDescriptionField'
