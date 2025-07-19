import 'dotenv/config' 
import { z } from 'zod'


const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

// validação do ambiente
const _env = envSchema.safeParse(process.env)

// se a validação falhar, exibe o erro
if(_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  // encerra o processo e nao inicia o servidor
  throw new Error('Invalid environment variables')
}

export const env = _env.data
