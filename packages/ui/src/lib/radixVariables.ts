import {
  ButtonProps,
  ContainerProps,
  FlexProps,
  GridProps,
  IconButtonProps,
  SectionProps,
  TextProps,
} from '@radix-ui/themes'

export const defaultButtonSize: ButtonProps['size'] = { initial: '2', sm: '3' }

export const defaultIconSize: IconButtonProps['size'] = { initial: '1', sm: '2' }

export const defaultContainerSize: ContainerProps['size'] = {
  initial: '1',
  sm: '2',
  md: '3',
  lg: '4',
}

export const defaultSectionSize: SectionProps['size'] = { initial: '1', sm: '2' }

export const defaultTextSize: TextProps['size'] = { initial: '2', sm: '3' }

export const defaultFlexGap: FlexProps['gap'] = { initial: '3', sm: '4' }

export const defaultGridGap: GridProps['gap'] = { initial: '5', sm: '6' }
