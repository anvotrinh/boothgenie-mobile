import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { LoginScreen, ResetPasswordScreen } from '../../screens'
import { BackButton } from '../back-button'
import { navigationStyles } from '../navigation-styles'

export const AuthNavigator = createStackNavigator(
  {
    login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    resetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: () => ({
        headerTitle: 'Reset password',
      }),
    },
  },
  {
    initialRouteName: 'login',
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackTitleVisible: false,
      headerStyle: navigationStyles.headerStyle,
      headerTitleStyle: navigationStyles.headerTitleChildStyle,
      headerLeft() {
        return <BackButton goBack={navigation.goBack} />
      },
    }),
  }
)
