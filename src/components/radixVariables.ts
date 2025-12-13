import { ComponentProps } from 'react'

import { ButtonProps, ContainerProps, FlexProps, Section, TextProps } from '@radix-ui/themes'

export const baseTextSize: TextProps['size'] = { initial: '2', sm: '3' }

export const baseFlexGap: FlexProps['gap'] = { initial: '3', sm: '4' }

export const baseGridGap: FlexProps['gap'] = { initial: '3', sm: '4' }

export const defaultSectionSize: ComponentProps<typeof Section>['size'] = { initial: '1', sm: '2' }

export const defaultContainerSize: ContainerProps['size'] = {
  initial: '1',
  sm: '2',
  md: '3',
  lg: '4',
}

export const defaultButtonSize: ButtonProps['size'] = { initial: '2', sm: '3' }

export const defaultIconSize: ButtonProps['size'] = { initial: '1', sm: '2' }
