import { OptionObject } from 'payload'

export type UserRole = 'platform' | 'client'

export type PlatformRole = 'admin' | 'dev' | 'support'

export type ClientRole =
  | 'executiveVp'
  | 'regionalVp'
  | 'districtGm'
  | 'generalManager'
  | 'venueManager'
  | 'departmentManager'
  | 'supervisor'

export const USER_ROLES: OptionObject[] = [
  { label: 'Venue IQ User', value: 'platform' as UserRole },
  { label: 'Client User', value: 'client' as UserRole },
]

export const PLATFORM_ROLES: OptionObject[] = [
  { label: 'Admin', value: 'admin' as PlatformRole },
  { label: 'Developer', value: 'dev' as PlatformRole },
  { label: 'Support', value: 'support' as PlatformRole },
]

export const CLIENT_ROLES: OptionObject[] = [
  { label: 'Executive VP', value: 'executiveVp' as ClientRole },
  { label: 'Regional VP', value: 'regionalVp' as ClientRole },
  { label: 'District GM', value: 'districtGm' as ClientRole },
  { label: 'General Manager', value: 'generalManager' as ClientRole },
  { label: 'Venue Manager', value: 'venueManager' as ClientRole },
  { label: 'Department Manager', value: 'departmentManager' as ClientRole },
  { label: 'Supervisor', value: 'supervisor' as ClientRole },
]
