import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import {
  Select as SelectDefault,
  SelectProps as SelectPropsDefault,
} from '@ui-kitten/components'
import { typography } from '../../theme'

interface Styles {
  select: TextStyle
}

const styles = StyleSheet.create<Styles>({
  select: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
  },
})

interface SelectProps extends SelectPropsDefault {
  textStyle?: TextStyle
}

export const Select = ({ textStyle: styleOverride, ...rest }: SelectProps) => {
  const style = styleOverride
    ? { ...styles.select, ...styleOverride }
    : styles.select
  return <SelectDefault textStyle={style} {...rest} />
}
