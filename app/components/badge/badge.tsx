import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../text/text'
import { color, typography, spacing } from '../../theme'

const size = 18

const styles = {
  badge: {
    alignSelf: 'center',
    minWidth: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.palette.clearBlue,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.white,
  },
  text: {
    fontSize: typography.fontSize.small,
    color: color.palette.white,
    paddingHorizontal: spacing[1],
  },
}

const Badge = props => {
  const { containerStyle, textStyle, badgeStyle, value, ...attributes } = props

  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <View
        {...attributes}
        style={StyleSheet.flatten([styles.badge, badgeStyle && badgeStyle])}
      >
        <Text style={StyleSheet.flatten([styles.text, textStyle && textStyle])}>
          {value}
        </Text>
      </View>
    </View>
  )
}

export { Badge }
