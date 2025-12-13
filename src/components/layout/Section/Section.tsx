import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Section as RadixSection } from '@radix-ui/themes'

import { defaultSectionSize } from '@/components/radixVariables'

export type SectionProps = Omit<ComponentPropsWithoutRef<typeof RadixSection>, 'asChild'>

export const Section = forwardRef<HTMLDivElement, SectionProps>(function Section(
  { size = defaultSectionSize, ...props },
  ref,
) {
  return <RadixSection ref={ref} size={size} {...props} />
})
