import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { color, typography } from '../theme'

interface Styles {
  headerStyle: ViewStyle
  darkHeaderTitleStyle: TextStyle
  darkHeaderStyle: ViewStyle
  headerShadowStyle: ViewStyle
  headerTitleChildStyle: TextStyle
  headerTitleMainStyle: TextStyle
}

export const navigationStyles = StyleSheet.create<Styles>({
  darkHeaderStyle: {
    backgroundColor: color.palette.ebonyClay,
  },
  darkHeaderTitleStyle: {
    color: color.palette.white,
  },
  headerShadowStyle: {
    elevation: 1,
    shadowColor: color.palette.darkIndigo6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: color.palette.transparent,
  },
  headerTitleChildStyle: {
    color: color.heading,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.navHeadingChild,
    fontWeight: typography.fontWeight.semiBold,
  },
  headerTitleMainStyle: {
    color: color.heading,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.navHeadingMain,
    fontWeight: typography.fontWeight.semiBold,
  },
})
