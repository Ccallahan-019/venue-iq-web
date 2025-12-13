import { forwardRef } from 'react'

import { BaseFlex, type BaseFlexProps } from './BaseFlex'

export type CenterProps = Omit<BaseFlexProps, 'align' | 'justify'>

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Inline(props, ref) {
  return <BaseFlex ref={ref} align="center" justify="center" {...props} />
})
