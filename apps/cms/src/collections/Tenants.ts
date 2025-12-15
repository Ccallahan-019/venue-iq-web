import { type CollectionConfig, slugField } from 'payload'

import { authenticated, isPlatformAdminAccess } from '@/access'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isPlatformAdminAccess,
    delete: isPlatformAdminAccess,
    read: authenticated,
    update: isPlatformAdminAccess,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    slugField({
      useAsSlug: 'name',
    }),
    {
      type: 'group',
      name: 'defaults',
      fields: [
        { name: 'timezone', type: 'text', defaultValue: 'America/New_York' },
        { name: 'currency', type: 'text', defaultValue: 'USD' },
      ],
    },
  ],
}
