import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.url(),
})

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
})

if (!parsed.success) {
  console.error('Invalid client environment variables:')
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid client environment variables')
}

export const clientEnv = parsed.data
