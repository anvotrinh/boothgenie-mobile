import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { navigationStyles } from '../../navigation-styles'
import { RoomListScreen } from '../../../screens/chat-screen/room-list-screen'
import { ChatRoomScreen } from '../../../screens/chat-screen/chat-room-screen'
import { ChatRoomName } from './chat-room-name'
import { BackButton } from '../../back-button'

export const ChatTabNavigator = createStackNavigator(
  {
    roomList: {
      screen: RoomListScreen,
      navigationOptions: () => ({
        headerTitle: 'Chat',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
        headerTitleStyle: navigationStyles.headerTitleMainStyle,
      }),
    },
    chatRoom: {
      screen: ChatRoomScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle() {
          return <ChatRoomName navigation={navigation} />
        },
        headerTitleStyle: navigationStyles.darkHeaderTitleStyle,
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.darkHeaderStyle,
        ],

        tabBarVisible: false,
        headerLeft() {
          return <BackButton goBack={navigation.goBack} />
        },
      }),
    },
  },
  {
    initialRouteName: 'roomList',
    defaultNavigationOptions: () => ({
      headerBackTitleVisible: false,
      tabBarVisible: false,
    }),
  }
)

ChatTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]
  const navigationOptions = {} as any

  if (routeName === 'chatRoom') {
    navigationOptions.tabBarVisible = false
  }

  return navigationOptions
}
