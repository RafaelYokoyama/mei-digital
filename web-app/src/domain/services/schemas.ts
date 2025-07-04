import { z } from 'zod'

export const serviceFormSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres')
    .nonempty('Nome é obrigatório'),
  price: z.string()
    .nonempty('Preço é obrigatório')
    .refine((value) => {
      const number = Number(value)
      return !isNaN(number) && number > 0
    }, 'Preço deve ser um valor positivo'),
  description: z.string()
    .max(500, 'Descrição não pode ter mais de 500 caracteres')
    .optional()
})

export type ServiceFormData = z.infer<typeof serviceFormSchema> 