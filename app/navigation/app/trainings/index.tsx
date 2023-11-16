import * as React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { TrainingsScreen, TrainingDetailsScreen } from '../../../screens'
import { navigationStyles } from '../../navigation-styles'
import { Icon } from '../../../components/icon/icon'
import { spacing } from '../../../theme'
import { BackButton } from '../../back-button'
import { TrainingTitle } from './trainings-title'

interface Styles {
  iconLeft: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  iconLeft: {
    paddingLeft: spacing[4],
  },
})

export const TrainingsNavigator = createStackNavigator(
  {
    trainings: {
      screen: TrainingsScreen,
      navigationOptions: {
        headerTitle: 'My Courses',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
        headerTitleStyle: navigationStyles.headerTitleMainStyle,
        headerLeft() {
          return <Icon icon="preferences" containerStyle={styles.iconLeft} />
        },
      },
    },
    trainingDetails: {
      screen: TrainingDetailsScreen,
      navigationOptions: {
        headerTitle() {
          return <TrainingTitle />
        },
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
        headerTitleStyle: navigationStyles.headerTitleMainStyle,
      },
    },
  },
  {
    initialRouteName: 'trainings',
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft() {
        return <BackButton goBack={navigation.goBack} />
      },
      headerBackTitleVisible: false,
      headerStyle: navigationStyles.headerStyle,
    }),
  }
)
