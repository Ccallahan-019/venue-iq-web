import { z } from 'zod'

const cmsServerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  POSTGRES_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),

  PAYLOAD_SECRET: z.string().min(1),
  PAYLOAD_PUBLIC_SERVER_URL: z.url(),

  PAYLOAD_COOKIE_DOMAIN: z.string().min(1).optional(),
  PAYLOAD_COOKIE_SECURE: z.coerce.boolean().optional(),
  PAYLOAD_COOKIE_SAMESITE: z.enum(['lax', 'strict', 'none']).optional(),

  PAYLOAD_EMAIL_FROM: z.string().min(1).optional(),

  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASS: z.string().min(1).optional(),
})

const parsed = cmsServerEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_URL: process.env.POSTGRES_URL,
  DATABASE_URL: process.env.DATABASE_URL,

  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,

  PAYLOAD_COOKIE_DOMAIN: process.env.PAYLOAD_COOKIE_DOMAIN,
  PAYLOAD_COOKIE_SECURE: process.env.PAYLOAD_COOKIE_SECURE,
  PAYLOAD_COOKIE_SAMESITE: process.env.PAYLOAD_COOKIE_SAMESITE,

  PAYLOAD_EMAIL_FROM: process.env.PAYLOAD_EMAIL_FROM,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
})

if (!parsed.success) {
  console.error('Invalid CMS server environment variables:')
  console.error(z.treeifyError(parsed.error))
  throw new Error('Invalid CMS server environment variables')
}

export const cmsEnv = parsed.data

export const getPayloadServerUrl = () => {
  return cmsEnv.PAYLOAD_PUBLIC_SERVER_URL
}
