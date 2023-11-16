import * as React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { FontIcon } from '../index'
import { color, spacing } from '../../theme'

interface Styles {
  checkIcon: ViewStyle
  checkIconWrapper: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  checkIcon: {
    marginTop: 4,
  },
  checkIconWrapper: {
    alignItems: 'center',
    borderColor: color.palette.deepSkyBlue,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginRight: spacing[5],
    width: 40,
  },
})

interface CheckIconProps {
  isChecked: boolean
}

export const CheckIcon = ({ isChecked }: CheckIconProps) => {
  const bgColor = isChecked ? color.palette.deepSkyBlue : 'transparent'
  let icon: React.ReactElement | null = null
  if (isChecked) {
    icon = (
      <FontIcon
        pack="feather"
        color={color.palette.white}
        name="check"
        size={22}
        style={styles.checkIcon}
      />
    )
  }
  return (
    <View style={[styles.checkIconWrapper, { backgroundColor: bgColor }]}>
      {icon}
    </View>
  )
}
