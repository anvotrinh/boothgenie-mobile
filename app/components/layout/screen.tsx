import * as React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Layout as LayoutDefault, LayoutProps } from '@ui-kitten/components'
import { spacing } from '../../theme'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    flex: 1,
    padding: spacing[4],
  },
})

export const Screen = ({
  children,
  style: styleOverride,
  ...rest
}: LayoutProps) => {
  const style = styleOverride
    ? { ...styles.screen, styleOverride }
    : styles.screen
  return (
    <LayoutDefault style={style} {...rest}>
      {children}
    </LayoutDefault>
  )
}
