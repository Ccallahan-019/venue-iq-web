'use client'

import { useEffect, useState } from 'react'

import { Theme, ThemeProps } from '@radix-ui/themes'

import { useTheme } from '../Theme/ThemeProvider'

export const RadixThemeProvider: React.FC<ThemeProps> = (props) => {
  const { theme } = useTheme()
  const [isReady, setIsReady] = useState(false)

  const {
    appearance,
    accentColor = 'blue',
    grayColor,
    radius = 'small',
    scaling = '100%',
    children,
  } = props

  useEffect(() => {
    const handlePageLoad = () => {
      setIsReady(true)
    }

    handlePageLoad()
  }, [])

  if (!isReady) return null

  const themeAppearance = theme === 'dark' || theme === 'light' ? theme : undefined

  return (
    <Theme
      appearance={appearance ?? themeAppearance}
      accentColor={accentColor}
      grayColor={grayColor}
      radius={radius}
      scaling={scaling}
      panelBackground="translucent"
    >
      {children}
    </Theme>
  )
}
