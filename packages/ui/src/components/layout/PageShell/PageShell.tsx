import { forwardRef } from 'react'

import { Box, BoxProps } from '@radix-ui/themes'

export type PageShellProps = Omit<BoxProps, 'asChild'>

export const PageShell = forwardRef<HTMLDivElement, PageShellProps>(function PageShell(
  { minHeight = '100vh', children, ...props },
  ref,
) {
  return (
    <Box ref={ref} minHeight={minHeight} {...props}>
      {children}
    </Box>
  )
})
