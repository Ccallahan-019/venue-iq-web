import { forwardRef } from 'react'

import { BaseFlex, type BaseFlexProps } from './BaseFlex'

export type StackProps = Omit<BaseFlexProps, 'direction'>

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { align = 'stretch', ...props },
  ref,
) {
  return <BaseFlex ref={ref} direction="column" align={align} {...props} />
})
