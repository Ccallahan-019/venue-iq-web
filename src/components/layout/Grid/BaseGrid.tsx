import { forwardRef } from 'react'

import { Grid, type GridProps } from '@radix-ui/themes'

import { baseGridGap } from '@/components/radixVariables'

export type BaseGridProps = Omit<GridProps, 'asChild'>

export const BaseGrid = forwardRef<HTMLDivElement, BaseGridProps>(function BaseGrid(
  { gap = baseGridGap, columns = '12', ...props },
  ref,
) {
  return <Grid ref={ref} gap={gap} columns={columns} {...props} />
})
