import * as React from 'react'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Button, ButtonProps, Icon } from '../../components'
import { color } from '../../theme'

const GoogleIcon = (style: ImageStyle) => {
  delete style.tintColor
  return <Icon icon="google" style={style} />
}

interface Styles {
  button: ViewStyle
  text: TextStyle
}

const shadowColor = '#111'
const textColor = '#303030'

const styles = StyleSheet.create<Styles>({
  button: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.veryLightBlue,
    borderWidth: 1,
    minHeight: 48,
    shadowColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.06,
  },
  text: {
    color: textColor,
  },
})

export const GoogleLoginButton = (props: ButtonProps) => {
  return (
    <Button
      icon={GoogleIcon}
      status="basic"
      style={styles.button}
      textStyle={styles.text}
      {...props}
    >
      Login with Google
    </Button>
  )
}
