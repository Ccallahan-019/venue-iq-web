import { env } from '../env'
import { canUseDOM } from './canUseDOM'

let url: string | null = null

export const getURL = () => {
  if (url) return url

  if (canUseDOM) {
    const { protocol, host } = window.location
    url = `${protocol}//${host}`

    return url
  }

  url = (env.SERVER_URL || 'http://localhost:3000').replace(/\/+$/, '')

  return url
}
