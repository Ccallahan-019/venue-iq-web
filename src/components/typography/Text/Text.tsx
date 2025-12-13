import { Text as RadixText, TextProps } from '@radix-ui/themes'

import { baseTextSize } from '@/components/radixVariables'

export const Text: React.FC<TextProps> = ({
  size = baseTextSize,
  wrap = 'pretty',
  weight = 'regular',
  ...props
}) => {
  return <RadixText wrap={wrap} size={size} weight={weight} {...props} />
}
