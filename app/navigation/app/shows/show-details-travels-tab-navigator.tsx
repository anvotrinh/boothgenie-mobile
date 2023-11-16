import * as React from 'react'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { ShowMyTravelsScreen, ShowAllTravelsScreen } from '../../../screens'
import { color, typography } from '../../../theme'

const TabBars = {
  'showDetails:travels:myTravels': 'My Travels',
  'showDetails:travels:allTravels': 'All Travels',
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

export const ShowDetailsTravelsTopTabNavigator = createAppContainer(
  createMaterialTopTabNavigator(
    {
      'showDetails:travels:myTravels': { screen: ShowMyTravelsScreen },
      'showDetails:travels:allTravels': { screen: ShowAllTravelsScreen },
    },
    {
      initialRouteName: 'showDetails:travels:myTravels',
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
)
