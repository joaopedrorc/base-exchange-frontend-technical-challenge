import { z } from 'zod';

export const formSchema = z.object({
  asset: z
    .string({
      required_error: 'Ativo é obrigatório',
    })
    .min(1, 'Ativo é obrigatório'),
  side: z.enum(['Compra', 'Venda'], {
    required_error: 'Selecione uma opção',
  }),
  price: z
    .string()
    .regex(
      /^(\s?R\$)?\s?\d{1,3}(\.\d{3})*(,\d{2})?$/,
      'Preço inválido, use o formato R$ 1.000,00'
    )
    .min(1, 'Preço é obrigatório'),
  amount: z
    .string()
    .min(1, { message: 'Valor obrigatório' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 10000, {
      message: 'O valor deve ser entre 1 e 10.000',
    })
    .transform((val) => val.toString()),
});
