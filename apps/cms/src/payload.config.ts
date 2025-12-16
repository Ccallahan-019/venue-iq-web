import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Config } from '@venue-iq/cms-types'
import { cmsEnv } from '@venue-iq/shared/env/cms'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { InventoryItems, Tenants, Users, Venues } from '@/collections'

import { isPlatformAdmin } from './access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

declare module 'payload' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface GeneratedTypes extends Config {}
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'app', 'admin', 'importMap.js'),
    },
  },
  collections: [Tenants, Users, Venues, InventoryItems],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(process.cwd(), '../../packages/cms-types/src/index.ts'),
    declare: false,
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: cmsEnv.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    multiTenantPlugin<Config>({
      collections: {
        venues: {},
        inventoryItems: {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req: { user } }) => {
            if (isPlatformAdmin(user)) return true

            return false
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isPlatformAdmin(user),
    }),
  ],
})
