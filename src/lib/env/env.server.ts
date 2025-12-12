import { z } from 'zod'

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  POSTGRES_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  SERVER_URL: z.url(),
})

const parsed = serverEnvSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid server environment variables:')
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid server environment variables')
}

export const env = parsed.data
