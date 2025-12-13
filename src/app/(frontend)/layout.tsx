import '@radix-ui/themes/styles.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { RadixThemeProvider } from '@/lib/providers'
import { ThemeProvider } from '@/lib/providers'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Venue IQ',
  description: 'Venue IQ | Venue Concessions Optimization',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeProvider>
          <RadixThemeProvider>{children}</RadixThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
