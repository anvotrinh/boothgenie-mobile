import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { Text as TextDefault, TextProps } from '@ui-kitten/components'
import { color, typography } from '../../theme'

interface Styles {
  text: TextStyle
  h1: TextStyle
  h3: TextStyle
}

const base = {
  color: color.text,
  fontSize: typography.fontSize.regular,
}

const styles = StyleSheet.create<Styles>({
  h1: {
    ...base,
    color: color.heading,
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 40,
  },
  h3: {
    ...base,
    color: color.heading,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 30,
  },
  text: base,
})

const mapCategoryToStyle = (category: string) => {
  switch (category) {
    case 'h1':
      return styles.h1
    case 'h3':
      return styles.h3
    default:
      return styles.text
  }
}

export const Text = ({
  category,
  children,
  style: styleOverride,
  ...rest
}: TextProps) => {
  const defaultStyle = mapCategoryToStyle(category)
  const style = styleOverride
    ? { ...defaultStyle, ...styleOverride }
    : defaultStyle
  return (
    <TextDefault style={style} category={category} {...rest}>
      {children}
    </TextDefault>
  )
}
