import { forwardRef } from 'react'

import {
  Container as RadixContainer,
  type ContainerProps as RadixContainerProps,
} from '@radix-ui/themes'

import { defaultContainerSize } from '@/components/radixVariables'

export type ContainerProps = Omit<RadixContainerProps, 'asChild'>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = defaultContainerSize, ...props },
  ref,
) {
  return <RadixContainer ref={ref} size={size} {...props} />
})
