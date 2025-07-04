import { Input } from '@/components/layout/ui/input'
import { Label } from '@/components/layout/ui/label'

interface ServicePriceFieldProps {
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ServicePriceField({
  value,
  error,
  onChange
}: ServicePriceFieldProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='price' className='font-medium'>
        Preço do Serviço
      </Label>
      <div className='relative'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary'>
          R$
        </span>
        <Input
          id='price'
          name='price'
          value={value}
          onChange={onChange}
          placeholder='0,00'
          className={`pl-8 ${error ? 'border-destructive' : ''}`}
        />
      </div>
      {error && (
        <p className='text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1'>
          {error}
        </p>
      )}
    </div>
  )
}
