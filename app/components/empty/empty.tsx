import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { FontIcon, Pack, Text } from '../index'
import { color, spacing } from '../../theme'

interface Styles {
  containerStyle: ViewStyle
  iconStyle: TextStyle
  descriptionStyle: TextStyle
}

const styles = StyleSheet.create<Styles>({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionStyle: {},
  iconStyle: {
    color: color.text,
    fontSize: spacing[8],
  },
})

interface Props {
  children?: React.ReactNode
  containerStyle?: ViewStyle
  description: string
  descriptionStyle?: ViewStyle
  iconName?: string
  iconPack?: Pack
  iconStyle?: TextStyle
}

export const Empty = ({
  children,
  containerStyle: containerStyleOverride,
  description,
  descriptionStyle: descriptionStyleOverride,
  iconName = 'inbox',
  iconPack = 'feather',
  iconStyle: iconStyleOverride,
}: Props) => {
  const containerStyle = containerStyleOverride
    ? { ...styles.containerStyle, ...containerStyleOverride }
    : styles.containerStyle
  const descriptionStyle = descriptionStyleOverride
    ? { ...styles.descriptionStyle, ...descriptionStyleOverride }
    : styles.descriptionStyle
  const iconStyle = iconStyleOverride
    ? { ...styles.iconStyle, ...iconStyleOverride }
    : styles.iconStyle

  return (
    <View style={containerStyle}>
      <FontIcon pack={iconPack} name={iconName} style={iconStyle} />
      <Text style={descriptionStyle}>{description}</Text>
      {children}
    </View>
  )
}
