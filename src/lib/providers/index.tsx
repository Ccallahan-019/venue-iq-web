import { RadixThemeProvider } from './RadixTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <RadixThemeProvider>{children}</RadixThemeProvider>
    </ThemeProvider>
  )
}
