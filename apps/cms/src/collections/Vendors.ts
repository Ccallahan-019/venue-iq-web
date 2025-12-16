import { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              index: true,
            },
            {
              name: 'venue',
              type: 'relationship',
              relationTo: 'venues',
              hasMany: false,
              required: true,
            },
            {
              name: 'primaryContact',
              type: 'group',
              fields: [
                {
                  name: 'phone',
                  label: 'Phone Number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Inventory Catalog',
          fields: [
            {
              name: 'catalog',
              label: false,
              type: 'join',
              collection: 'inventoryItems',
              on: 'sources.source',
            },
          ],
        },
      ],
    },
  ],
}
