import { Access } from 'payload'

import { isPlatformAdmin } from '@/access'

import { isAccessingSelf } from './isAccessingSelf'

export const updateAccess: Access = ({ req, id }) => {
  const { user } = req

  if (!user) {
    return false
  }

  if (isPlatformAdmin(user) || isAccessingSelf({ user, id })) {
    return true
  }

  return false
}
