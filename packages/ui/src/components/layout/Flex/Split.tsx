import { forwardRef } from 'react'

import { BaseFlex, type BaseFlexProps } from './BaseFlex'

export type SplitProps = Omit<BaseFlexProps, 'direction' | 'justify'>

export const Split = forwardRef<HTMLDivElement, SplitProps>(function Split(
  { align = 'center', ...props },
  ref,
) {
  return <BaseFlex ref={ref} direction="row" align={align} justify="between" {...props} />
})
