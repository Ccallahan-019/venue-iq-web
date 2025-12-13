import { forwardRef } from 'react'

import {
  IconButton as RadixIconButton,
  type IconButtonProps as RadixIconButtonProps,
  Tooltip,
  type TooltipProps,
} from '@radix-ui/themes'

import { defaultIconSize } from '@/components/radixVariables'

export type IconButtonProps = Omit<RadixIconButtonProps, 'asChild'> & {
  tooltip?: React.ReactNode
  tooltipSide?: TooltipProps['side']
  tooltipAlign?: TooltipProps['align']
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { tooltip, tooltipSide = 'top', tooltipAlign = 'center', ...props },
  ref,
) {
  const button = <RadixIconButton ref={ref} size={defaultIconSize} {...props} />

  if (!tooltip) return button

  return (
    <Tooltip content={tooltip} side={tooltipSide} align={tooltipAlign}>
      {button}
    </Tooltip>
  )
})
