import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServiceRepository } from '@/infra/hooks/useServiceRepository'
import { ServiceFormData, serviceFormSchema } from '../schemas'
import { useState } from 'react'

export function useServiceForm() {
  const router = useRouter()
  const repository = useServiceRepository()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: '',
      price: '',
      description: ''
    }
  })

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    if (value) {
      const number = parseInt(value, 10) / 100
      value = number.toFixed(2)
    }
    setValue('price', value)
  }

  const onSubmit = hookFormSubmit(async (data) => {
    setError(null)

    try {
      await repository.create({
        name: data.name.trim(),
        description: data.description?.trim() || '',
        price: Number(data.price)
      })

      router.push('/services')
      router.refresh()
    } catch (err) {
      console.error('Error creating service:', err)
      setError(
        'Ocorreu um erro ao criar o serviço. Por favor, tente novamente.'
      )
    }
  })

  return {
    register,
    errors,
    error,
    isSubmitting,
    handlePriceChange,
    handleSubmit: onSubmit,
    watch
  }
} 