import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import type { CollectionConfig } from 'payload'

import { isPlatformAdmin, isPlatformAdminAccess } from '@/access'
import { CLIENT_ROLES, PLATFORM_ROLES, USER_ROLES } from '@/fields'

import { readAccess, updateAccess } from './access'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'clientRole',
      type: 'select',
      defaultValue: 'supervisor',
      required: true,
      hasMany: false,
      options: CLIENT_ROLES,
      access: {
        update: ({ req: { user } }) => {
          if (isPlatformAdmin(user)) return true

          return false
        },
      },
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: true,
  },

  access: {
    create: isPlatformAdminAccess,
    read: readAccess,
    update: updateAccess,
    delete: isPlatformAdminAccess,
  },

  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'email', 'role'],
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'displayName',
      type: 'text',
      admin: {
        description: 'Optional. Defaults to first and last name if empty.',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: USER_ROLES,
      defaultValue: 'client',
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req }) => {
          return isPlatformAdmin(req.user)
        },
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'platformRole',
      type: 'select',
      hasMany: false,
      options: PLATFORM_ROLES,
      defaultValue: 'support',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData.role === 'platform',
      },
      access: {
        update: ({ req }) => {
          return isPlatformAdmin(req.user)
        },
      },
      validate: (val, { data }) => {
        if (!data || !('role' in data)) return 'Missing user data.'

        if (data.role === 'client') {
          return 'Client users cannot have a platform role.'
        } else {
          return Boolean(val) || 'Platform users must have a platform role.'
        }
      },
    },
    {
      ...defaultTenantArrayField,
      maxRows: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
