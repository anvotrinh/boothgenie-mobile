import * as React from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Button, FontIcon } from '../../../components'
import { color } from '../../../theme'
import { isIOS } from '../../../utils/platform'

interface Styles {
  button: ViewStyle
  icon: TextStyle
}

const styles = StyleSheet.create<Styles>({
  button: {
    paddingRight: 7,
  },
  icon: {
    height: 32,
  },
})

export const NotificationIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      style={{ ...style, ...styles.icon }}
      color={color.palette.lightBlueGrey}
      name={`${isIOS ? 'ios' : 'md'}-notifications-outline`}
      pack="ion"
      size={32}
    />
  )
}

export const NotificationButton = () => (
  <Button icon={NotificationIcon} appearance="ghost" style={styles.button} />
)
