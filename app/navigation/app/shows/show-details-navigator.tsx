import * as React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {
  BlankScreen,
  ShowMyTravelsScreen,
  ShowOverviewScreen,
  ShowROIScreen,
  ShowScheduleScreen,
  ShowExpensesScreen,
  ShowTeamScreen,
} from '../../../screens'
import { ShowDetailsTravelsTopTabNavigator } from './show-details-travels-tab-navigator'
import { ShowDetailsTasksNavigator } from './show-details-tasks-navigator'
import { session } from '../../../utils/session'

export const ShowDetailsNavigator = createStackNavigator(
  {
    'showDetails:overview': { screen: ShowOverviewScreen },
    'showDetails:roi': { screen: ShowROIScreen },
    'showDetails:tasks': { screen: ShowDetailsTasksNavigator },
    'showDetails:schedule': { screen: ShowScheduleScreen },
    'showDetails:travel': {
      screen(props: NavigationScreenProp<{}>) {
        return session.get('isInternalUser') ? (
          <ShowDetailsTravelsTopTabNavigator />
        ) : (
          <ShowMyTravelsScreen {...props} />
        )
      },
    },
    'showDetails:expenses': { screen: ShowExpensesScreen },
    'showDetails:team': { screen: ShowTeamScreen },
    'showDetails:resources': { screen: BlankScreen },
  },
  {
    initialRouteName: 'showDetails:overview',
    defaultNavigationOptions: () => ({
      headerShown: false,
      gestureEnabled: false,
    }),
    mode: 'modal',
  }
)
