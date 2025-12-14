import { forwardRef } from 'react'

import { BaseFlex, type BaseFlexProps } from './BaseFlex'

export type InlineProps = Omit<BaseFlexProps, 'direction'>

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { align = 'center', ...props },
  ref,
) {
  return <BaseFlex ref={ref} direction="row" align={align} {...props} />
})
