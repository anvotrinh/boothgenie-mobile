import * as React from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Button, FontIcon } from '../components'
import { color } from '../theme'

export const BackIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      style={style}
      color={color.palette.lightBlueGrey}
      name="chevron-left"
      pack="feather"
      size={24}
    />
  )
}

interface Styles {
  button: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  button: {
    paddingLeft: 0,
    paddingTop: 10,
  },
})

interface Props {
  goBack: (routeKey?: string | null) => boolean
}

export const BackButton = ({ goBack }: Props) => (
  <Button
    icon={BackIcon}
    appearance="ghost"
    onPress={() => goBack()}
    style={styles.button}
  />
)
