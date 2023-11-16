import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { Icon } from '@ui-kitten/components'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const FeatherIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style)
  return (
    <Feather name={name} size={height} color={tintColor} style={iconStyle} />
  )
}

const IconProvider = (name: string) => ({
  toReactElement: props => FeatherIcon({ name, ...props }),
})

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name: string) {
        return IconProvider(name)
      },
    }
  )
}

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
}

export type Pack =
  | 'entypo'
  | 'eva'
  | 'evil'
  | 'feather'
  | 'font-awesome'
  | 'foundation'
  | 'ion'
  | 'material'
  | 'material-community'
  | 'simple-line'
  | 'ant'

interface FontIconProps {
  color?: string
  name: string
  pack?: Pack
  size?: number
  style?: TextStyle
}

export const FontIcon = ({ pack, ...rest }: FontIconProps) => {
  switch (pack) {
    case 'entypo':
      return <Entypo {...rest} />
    case 'eva':
      return <Icon {...rest} />
    case 'evil':
      return <EvilIcons {...rest} />
    case 'feather':
      return <Feather {...rest} />
    case 'foundation':
      return <Foundation {...rest} />
    case 'ion':
      return <Ionicons {...rest} />
    case 'material':
      return <MaterialIcons {...rest} />
    case 'ant':
      return <AntDesign {...rest} />
    case 'material-community':
      return <MaterialCommunityIcons {...rest} />
    case 'simple-line':
      return <SimpleLineIcons {...rest} />
    default:
      return <FontAwesome {...rest} />
  }
}
