'use client'

import { forwardRef } from 'react'

import { Button as RadixButton, type ButtonProps as RadixButtonProps } from '@radix-ui/themes'

import { defaultButtonSize } from '../../../lib'

export type ButtonProps = Omit<RadixButtonProps, 'asChild'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size = defaultButtonSize, variant = 'soft', ...props },
  ref,
) {
  return <RadixButton ref={ref} size={size} variant={variant} {...props} />
})
