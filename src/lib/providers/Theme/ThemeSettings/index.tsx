'use client'

import { createContext, useContext } from 'react'

import { ThemeSetting } from '@/payload-types'
import canUseDOM from '@/utilities/canUseDOM'

type ThemeSettings = {
  accentColor?: ThemeSetting['accentColor']
  grayColor?: ThemeSetting['grayColor']
  radius?: ThemeSetting['radius']
}

export interface ContextType {
  themeSettings?: ThemeSettings | null
  setThemeSettings: (theme: ThemeSettings | null) => void
}

const ThemeSettingsContext = createContext<ThemeSettings | undefined>(undefined)

export const ThemeSettingsProvider: React.FC<React.PropsWithChildren<{ value: ThemeSettings }>> = ({
  value,
  children,
}) => {
  if (canUseDOM) {
    return <ThemeSettingsContext.Provider value={value}>{children}</ThemeSettingsContext.Provider>
  }
  return null
}

export const useThemeSettings = () => {
  const ctx = useContext(ThemeSettingsContext)
  if (!ctx) {
    throw new Error('useThemeSettings must be used within ThemeSettingsProvider')
  }
  return ctx
}
