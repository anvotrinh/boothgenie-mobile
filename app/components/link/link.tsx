import * as React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { color } from '../../theme'

interface Styles {
  link: TextStyle
}

const styles = StyleSheet.create<Styles>({
  link: {
    color: color.palette.waterBlue,
    fontSize: 14,
  },
})

interface LinkProps extends TouchableOpacityProps {
  children?: React.ReactNode
  textStyle?: TextStyle
  title?: string
}

export const Link = ({
  children,
  onPress,
  textStyle,
  title,
  ...rest
}: LinkProps) => {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={textStyle ? { ...styles.link, ...textStyle } : styles.link}>
        {children || title}
      </Text>
    </TouchableOpacity>
  )
}
