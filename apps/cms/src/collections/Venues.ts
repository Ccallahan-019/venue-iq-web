import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'
import { STATE_OPTIONS, TIME_ZONE_OPTIONS } from '@/fields'

export const Venues: CollectionConfig = {
  slug: 'venues',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'capacity', 'timeZone', 'updatedAt'],
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
              options: [
                { label: 'Sports Stadium', value: 'sportsStadium' },
                { label: 'Concert Arena', value: 'concertArena' },
                { label: 'College Venue', value: 'collegeVenue' },
                { label: 'Minor League Park', value: 'minorLeaguePark' },
                { label: 'Convention Center', value: 'conventionCenter' },
                { label: 'Other', value: 'other' },
              ],
            },

            {
              name: 'location',
              type: 'group',
              fields: [
                {
                  name: 'addressLine1',
                  label: 'Address Line 1',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'addressLine2',
                  label: 'Address Line 2',
                  type: 'text',
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  type: 'select',
                  options: STATE_OPTIONS,
                  required: true,
                },
                // Need to enforce formatting later
                {
                  name: 'zipCode',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'capacity',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Maximum seating or attendee capacity.',
              },
            },
            {
              name: 'timeZone',
              type: 'select',
              required: true,
              options: TIME_ZONE_OPTIONS,
              admin: {
                description: 'Used for event scheduling and cross-venue reporting.',
              },
            },
          ],
        },
        {
          label: 'Inventory',
          fields: [
            {
              name: 'inventory',
              label: false,
              type: 'join',
              collection: 'inventoryItems',
              on: 'venue',
            },
          ],
        },
      ],
    },
  ],
}
