import * as React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import {
  SettingsNotificationsScreen,
  SettingsSecurityScreen,
  SettingsProfileScreen,
} from '../../../screens'
import { color, typography } from '../../../theme'

const TabBars = {
  'settings:profile': 'Profile',
  'settings:security': 'Security',
  'settings:notifications': 'Notifications',
}

const getTabBarLabelStyle = (focused: boolean) => {
  return {
    fontWeight: focused
      ? typography.fontWeight.semiBold
      : typography.fontWeight.medium,
    paddingVertical: 5,
    color: focused ? color.palette.darkIndigo : color.palette.blueyGrey,
  }
}

const TabBarLabel = ({ focused, navigation }) => {
  const label = TabBars[navigation.state.routeName]
  const style = getTabBarLabelStyle(focused)
  return <Text style={style}>{label}</Text>
}

export const SettingsTopTabNavigator = createMaterialTopTabNavigator(
  {
    'settings:profile': { screen: SettingsProfileScreen },
    'settings:security': { screen: SettingsSecurityScreen },
    'settings:notifications': { screen: SettingsNotificationsScreen },
  },
  {
    initialRouteName: 'settings:profile',
    lazy: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel({ focused }) {
        return <TabBarLabel focused={focused} navigation={navigation} />
      },
    }),
    tabBarOptions: {
      activeTintColor: color.palette.darkIndigo,
      inactiveTintColor: color.palette.blueyGrey,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: typography.fontSize.regular,
      },
      activeTabStyle: {
        fontWeight: typography.fontWeight.semiBold,
      },
      style: {
        backgroundColor: color.palette.white,
      },
      indicatorStyle: {
        backgroundColor: color.palette.darkGreyBlue,
        height: 3,
      },
    },
  }
)
