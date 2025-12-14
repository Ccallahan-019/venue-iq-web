import { Text as RadixText, TextProps } from '@radix-ui/themes'

import { defaultTextSize } from '../../../lib'

export const Text: React.FC<TextProps> = ({
  size = defaultTextSize,
  wrap = 'pretty',
  weight = 'regular',
  ...props
}) => {
  return <RadixText wrap={wrap} size={size} weight={weight} {...props} />
}
