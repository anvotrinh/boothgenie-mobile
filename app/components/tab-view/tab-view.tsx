import * as React from 'react'
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { color } from '../../theme'

interface Styles {
  tabBarView: ViewStyle
  iconView: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  iconView: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  tabBarView: {
    backgroundColor: color.palette.white,
    flexGrow: 0,
    height: 50,
  },
})

interface Props {
  children: React.ReactNode
  iconStyle?: ViewStyle
  locked?: boolean
  onSelect?: (el: React.ReactElement) => void
  selected?: boolean
  selectedIconStyle?: ViewStyle
  selectedStyle?: ViewStyle
  style?: ViewStyle
}

const Tabs = ({
  children = [],
  iconStyle = {},
  locked = false,
  onSelect,
  selected = false,
  selectedStyle = {},
  selectedIconStyle = {},
  style = {},
}: Props) => {
  const onSelectHandler = (el: React.ReactElement) => {
    if (el.props.onSelect) {
      el.props.onSelect(el)
    } else if (onSelect) {
      onSelect(el)
    }
  }

  if (selected) {
    React.Children.forEach(
      children.filter(c => c),
      el => {
        if (!selected || el.props.initial) {
          selected = el.props.name || el.key
        }
      }
    )
  }

  return (
    <ScrollView
      horizontal
      style={[styles.tabBarView, style]}
      contentContainerStyle={[styles.iconView, iconStyle]}
    >
      {React.Children.map(
        children.filter(c => c),
        el => (
          <TouchableOpacity
            key={el.props.name + 'touch'}
            style={[
              styles.iconView,
              iconStyle,
              (el.props.name || el.key) == selected
                ? selectedIconStyle || el.props.selectedIconStyle || {}
                : {},
            ]}
            onPress={() => !locked && onSelectHandler(el)}
            onLongPress={() => onSelectHandler(el)}
            activeOpacity={el.props.pressOpacity}
          >
            {selected == (el.props.name || el.key)
              ? React.cloneElement(el, {
                  selected: true,
                  style: [
                    el.props.style,
                    selectedStyle,
                    el.props.selectedStyle,
                  ],
                })
              : el}
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  )
}

export const TabView = Tabs
