import * as React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { MyTaskScreen, MyTaskDetailsScreen } from '../../../screens'
import { navigationStyles } from '../../navigation-styles'
import { Icon } from '../../../components/icon/icon'
import { spacing } from '../../../theme'
import { BackButton } from '../../back-button'
import { CheckButton } from './check-button'

interface Styles {
  iconLeft: ViewStyle
  iconRight: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  iconLeft: {
    paddingLeft: spacing[4],
  },
  iconRight: {
    paddingRight: spacing[4],
  },
})

export const MyTasksNavigator = createStackNavigator(
  {
    myTasks: {
      screen: MyTaskScreen,
      navigationOptions: () => ({
        headerTitle: 'My Tasks',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
        headerTitleStyle: navigationStyles.headerTitleMainStyle,
        headerLeft() {
          return <Icon icon="preferences" containerStyle={styles.iconLeft} />
        },
        headerRight() {
          return <Icon icon="search" containerStyle={styles.iconRight} />
        },
      }),
    },
    taskDetails: {
      screen: MyTaskDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Task Details',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
        headerTitleStyle: navigationStyles.headerTitleChildStyle,
        headerLeft() {
          return <BackButton goBack={navigation.goBack} />
        },
        headerRight() {
          return <CheckButton navigation={navigation} />
        },
      }),
    },
  },
  {
    initialRouteName: 'myTasks',
    defaultNavigationOptions: () => ({
      headerBackTitleVisible: false,
    }),
  }
)
