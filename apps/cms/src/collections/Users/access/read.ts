import type { User } from '@venue-iq/cms-types'
import type { Access } from 'payload'

import { isPlatformAdmin } from '@/access'

import { isAccessingSelf } from './isAccessingSelf'

export const readAccess: Access<User> = ({ req, id }) => {
  const { user } = req

  if (!user) {
    return false
  }

  if (isPlatformAdmin(user) || isAccessingSelf({ user, id })) {
    return true
  }

  return false
}
