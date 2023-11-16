import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import {
  Button as ButtonDefault,
  ButtonProps as ButtonPropsDefault,
} from '@ui-kitten/components'
import { typography } from '../../theme'

interface Styles {
  button: TextStyle
}

const styles = StyleSheet.create<Styles>({
  button: {
    fontSize: typography.fontSize.regular,
  },
})

export type ButtonProps = ButtonPropsDefault

export const Button = ({ textStyle: styleOverride, ...rest }: ButtonProps) => {
  const style = styleOverride
    ? { ...styles.button, ...styleOverride }
    : styles.button
  return <ButtonDefault textStyle={style} {...rest} />
}
