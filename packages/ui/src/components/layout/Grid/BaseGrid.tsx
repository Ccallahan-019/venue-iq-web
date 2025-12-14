import { forwardRef } from 'react'

import { Grid, type GridProps } from '@radix-ui/themes'

import { defaultGridGap } from '../../../lib'

export type BaseGridProps = Omit<GridProps, 'asChild'>

export const BaseGrid = forwardRef<HTMLDivElement, BaseGridProps>(function BaseGrid(
  { gap = defaultGridGap, columns = '12', ...props },
  ref,
) {
  return <Grid ref={ref} gap={gap} columns={columns} {...props} />
})
