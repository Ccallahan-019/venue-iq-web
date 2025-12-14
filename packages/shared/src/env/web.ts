import { z } from 'zod'

const webPublicEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_CMS_URL: z.url(),
  NEXT_PUBLIC_VERCEL_URL: z.url().optional(),
})

const parsed = webPublicEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
})

if (!parsed.success) {
  console.error('Invalid web public environment variables:')
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid web public environment variables')
}

export const webPublicEnv = parsed.data

export const getWebBaseUrl = () => {
  if (webPublicEnv.NEXT_PUBLIC_APP_URL) return webPublicEnv.NEXT_PUBLIC_APP_URL
  if (webPublicEnv.NEXT_PUBLIC_VERCEL_URL) return `https://${webPublicEnv.NEXT_PUBLIC_VERCEL_URL}`
  return null
}

export const getPublicCmsUrl = () => {
  return webPublicEnv.NEXT_PUBLIC_CMS_URL
}
