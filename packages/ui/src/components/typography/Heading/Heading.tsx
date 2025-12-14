import { forwardRef } from 'react'

import { Heading as RadixHeading, type HeadingProps as RadixHeadingProps } from '@radix-ui/themes'

export type HeadingProps = Omit<RadixHeadingProps, 'asChild'>

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as = 'h2', size: sizeFromProps, weight = 'medium', ...props },
  ref,
) {
  const headingStyles = {
    h1: { size: { initial: '8', md: '9' } },
    h2: { size: { initial: '7', md: '8' } },
    h3: { size: { initial: '6', md: '7' } },
    h4: { size: { initial: '5', md: '6' } },
    h5: { size: { initial: '4', md: '5' } },
    h6: { size: { initial: '3', md: '4' } },
  }

  const { size } = headingStyles[as]

  return (
    <RadixHeading
      ref={ref}
      as={as}
      size={sizeFromProps ? sizeFromProps : (size as HeadingProps['size'])}
      weight={weight}
      {...props}
    />
  )
})
