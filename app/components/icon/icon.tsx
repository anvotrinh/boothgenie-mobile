import * as React from 'react'
import { Image, StyleSheet, View, ImageStyle } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { IconProps } from './icon.props'
import { icons } from './icons'

interface Styles {
  image: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  image: {
    resizeMode: 'contain',
  },
})

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = mergeAll(flatten([styles.image, styleOverride]))

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
