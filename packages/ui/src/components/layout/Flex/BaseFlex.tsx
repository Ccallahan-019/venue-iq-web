import { forwardRef } from 'react'

import { Flex, FlexProps } from '@radix-ui/themes'

import { defaultFlexGap } from '../../../lib'

export type BaseFlexProps = Omit<FlexProps, 'asChild'>

export const BaseFlex = forwardRef<HTMLDivElement, BaseFlexProps>(function BaseFlex(
  { gap = defaultFlexGap, ...props },
  ref,
) {
  return <Flex ref={ref} gap={gap} {...props} />
})
