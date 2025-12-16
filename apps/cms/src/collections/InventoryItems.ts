import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const InventoryItems: CollectionConfig = {
  slug: 'inventoryItems',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'unitOfMeasure', 'unitCost', 'parLevel', 'updatedAt'],
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
              name: 'unitOfMeasure',
              type: 'select',
              required: true,
              options: [
                { label: 'Each', value: 'each' },
                { label: 'Case', value: 'case' },
                { label: 'Pack', value: 'pack' },
                { label: 'Pound', value: 'lb' },
                { label: 'Ounce', value: 'oz' },
                { label: 'Gallon', value: 'gal' },
                { label: 'Liter', value: 'l' },
                { label: 'Milliliter', value: 'ml' },
              ],
            },
            // This will be swapped for a select field later
            {
              name: 'category',
              type: 'text',
              required: true,
              index: true,
              admin: {
                description: 'Examples: Meat, Beverage Supply, Packaging',
              },
            },
            {
              name: 'costingMethod',
              type: 'select',
              required: true,
              defaultValue: 'fifo',
              options: [
                { label: 'FIFO', value: 'fifo' },
                { label: 'Weighted Average', value: 'weightedAverage' },
              ],
            },
            // This will eventually become virtual and be derived from purchase orders
            {
              name: 'unitCost',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Last purchase unit cost (used to compute rolling average later).',
              },
            },
            {
              name: 'parLevel',
              type: 'number',
              min: 0,
              admin: {
                description: 'Minimum/target on-hand level that triggers reorder.',
              },
            },
          ],
        },
        {
          label: 'Vendor Sources',
          fields: [
            {
              name: 'sources',
              label: false,
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'source',
                  type: 'relationship',
                  relationTo: 'vendors',
                  hasMany: false,
                  required: true,
                  filterOptions: ({ data }) => {
                    if (!data || !data.venue) return false

                    return {
                      venue: { equals: data.venue },
                    }
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'price',
                      label: 'Unit Purchase Price',
                      type: 'number',
                      required: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'itemCode',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
