'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import type { Theme, ThemeContextType } from './types'
import { themeIsValid } from './types'

const ThemeContext = createContext<ThemeContextType>({
  setTheme: () => null,
  theme: undefined,
})

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return defaultTheme

  const stored = window.localStorage.getItem(themeLocalStorageKey)
  if (themeIsValid(stored)) return stored

  return getImplicitPreference() || defaultTheme
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (typeof window === 'undefined') return

    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      setThemeState(getImplicitPreference() || defaultTheme)
      return
    }

    setThemeState(themeToSet)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(themeLocalStorageKey, theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
