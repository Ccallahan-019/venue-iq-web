import { forwardRef } from 'react'

import { BaseFlex, BaseFlexProps } from './BaseFlex'

export type ClusterProps = Omit<BaseFlexProps, 'direction' | 'gap'>

export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(function Inline(
  { align = 'center', ...props },
  ref,
) {
  return (
    <BaseFlex ref={ref} align={align} direction="row" gap={{ initial: '1', sm: '2' }} {...props} />
  )
})
