import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import {
  Input as InputDefault,
  InputProps as InputPropsDefault,
} from '@ui-kitten/components'
import { typography } from '../../theme'

interface Styles {
  input: TextStyle
}

const styles = StyleSheet.create<Styles>({
  input: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
  },
})

interface InputProps extends InputPropsDefault {
  textStyle?: TextStyle
}

export const Input = ({ textStyle: styleOverride, ...rest }: InputProps) => {
  const style = styleOverride
    ? { ...styles.input, ...styleOverride }
    : styles.input
  return <InputDefault textStyle={style} {...rest} />
}
