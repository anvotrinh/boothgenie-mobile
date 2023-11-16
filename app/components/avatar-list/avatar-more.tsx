import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from '..'
import { color, typography } from '../../theme'

interface Styles {
  container: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.waterBlue,
    borderColor: color.palette.white,
    borderWidth: 1,
    justifyContent: 'center',
  },
  text: {
    color: color.palette.white,
    fontSize: 10,
    fontWeight: typography.fontWeight.semiBold,
  },
})

interface Props {
  more: number
  size: number
}

export const AvatarMore = ({ more, size }) => {
  const halfSize = Math.floor(size / 2)
  return (
    <View
      style={{
        ...styles.container,
        borderRadius: halfSize,
        marginLeft: -halfSize,
        height: size,
        width: size,
      }}
    >
      <Text style={styles.text}>+{more}</Text>
    </View>
  )
}
