import * as React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ShowsNavigator } from './shows'
import { MyTasksNavigator } from './my-tasks'
import { ChatTabNavigator } from './chat-tabs'
import { TrainingsNavigator } from './trainings'
import { Icon } from '../../components/icon/icon'

const TabBars = {
  showsTab: {
    icon: 'calendar',
    label: 'My Shows',
  },
  myTasksTab: {
    icon: 'check',
    label: 'My Tasks',
  },
  trainingTab: {
    icon: 'book',
    label: 'Training',
  },
  chatTab: {
    icon: 'comment',
    label: 'Chat',
  },
}

const TabBarIcon = ({ focused, navigation }) => {
  const { routeName } = navigation.state
  if (!routeName) return null
  const icon = focused
    ? `${TabBars[routeName].icon}Active`
    : `${TabBars[routeName].icon}Inactive`
  return <Icon icon={icon} />
}

const shadowColor = '#000'

export const AppNavigator = createBottomTabNavigator(
  {
    showsTab: ShowsNavigator,
    myTasksTab: MyTasksNavigator,
    trainingTab: TrainingsNavigator,
    chatTab: ChatTabNavigator,
  },
  {
    initialRouteName: 'showsTab',
    // lazy: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon({ focused }) {
        return <TabBarIcon focused={focused} navigation={navigation} />
      },
      tabBarLabel: TabBars[navigation.state.routeName].label,
    }),
    tabBarOptions: {
      style: {
        borderTopWidth: 0,
        shadowColor,
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.03,
        elevation: 4,
      },
    },
  }
)
