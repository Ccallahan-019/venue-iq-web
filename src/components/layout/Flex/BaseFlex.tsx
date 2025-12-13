import { forwardRef } from 'react'

import { Flex, FlexProps } from '@radix-ui/themes'

import { baseFlexGap } from '@/components/radixVariables'

export type BaseFlexProps = Omit<FlexProps, 'asChild'>

export const BaseFlex = forwardRef<HTMLDivElement, BaseFlexProps>(function BaseFlex(
  { gap = baseFlexGap, ...props },
  ref,
) {
  return <Flex ref={ref} gap={gap} {...props} />
})
