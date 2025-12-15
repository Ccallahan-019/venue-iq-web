import { User } from '@venue-iq/cms-types'
import { Access } from 'payload'

export const isPlatformAdminAccess: Access = ({ req }): boolean => {
  return isPlatformAdmin(req.user)
}

export const isPlatformAdmin = (user: User | null): boolean => {
  return Boolean(user && user.role === 'platform' && user.platformRole === 'admin')
}
