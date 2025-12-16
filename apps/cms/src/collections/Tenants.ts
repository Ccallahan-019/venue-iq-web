import { type CollectionConfig, slugField } from 'payload'

import { authenticated, isPlatformAdminAccess } from '@/access'
import { TIME_ZONE_OPTIONS } from '@/fields'

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
        {
          name: 'timeZone',
          type: 'select',
          options: TIME_ZONE_OPTIONS,
          defaultValue: 'America/New_York',
        },
        { name: 'currency', type: 'text', defaultValue: 'USD' },
      ],
    },
  ],
}
