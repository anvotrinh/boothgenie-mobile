import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { AuthNavigator } from './auth/auth-navigator'
import { AppNavigator } from './app/app-navigator'
import { AuthLoadingScreen } from '../screens'

export const PrimaryNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthNavigator,
      App: AppNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
