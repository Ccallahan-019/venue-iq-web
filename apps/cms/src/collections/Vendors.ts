import { CollectionConfig } from 'payload'

import { authenticated } from '@/access'
import { VENDOR_TYPE_OPTIONS } from '@/fields/vendorTypeOptions'

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
              name: 'type',
              type: 'select',
              required: true,
              hasMany: true,
              options: VENDOR_TYPE_OPTIONS,
            },
            {
              name: 'venue',
              type: 'relationship',
              relationTo: 'venues',
              hasMany: false,
              required: true,
              admin: {
                description: 'The venue this vendor supplies.',
              },
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
