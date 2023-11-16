import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { ShowsTopTabNavigator } from './shows-top-tab-navigator'
import { ShowDetailsNavigator } from './show-details-navigator'
import { navigationStyles } from '../../navigation-styles'
import { UserAvatar } from './user-avatar'
import { NotificationButton } from './notification-button'
import { HeaderDropdownMenu } from './header-dropdown-menu'
import { BackButton } from '../../back-button'
import {
  ShowTaskDetailsScreen,
  ShowPlaybookScreen,
  ShowSectionDetailsScreen,
  AddExpenseScreen,
  ShowMemberDetailsScreen,
  AddMemberScreen,
  ShowROIDetailsScreen,
} from '../../../screens'
import { CheckButton } from '../my-tasks/check-button'
import { HeaderShowName } from './header-show-name'
import { ShowEventDetailsScreen } from '../../../screens'
import { session } from '../../../utils/session'
import { HeaderRightShowDetails } from './header-right-show-details'
import { SettingsTopTabNavigator } from './settings-top-tab-navigator'
import { TravelDetailScreen } from '../../../screens/shows-screens/show-details-screens/show-travel-screen/travel-detail'

export const ShowsNavigator = createStackNavigator(
  {
    shows: {
      screen: ShowsTopTabNavigator,
      navigationOptions: () => ({
        headerTitle: 'My Shows',
        headerTitleStyle: navigationStyles.headerTitleMainStyle,
        headerLeft() {
          return <UserAvatar />
        },
        headerRight() {
          return <NotificationButton />
        },
      }),
    },
    showDetails: {
      screen: ShowDetailsNavigator,
      navigationOptions: () => {
        // Hack: should have a better solution when upgrade to react navigation 5
        const selectedShowDetailsTab =
          session.get('selectedShowDetailsTab') || {}
        const noShadow = ['showDetails:tasks', 'showDetails:travel'].includes(
          selectedShowDetailsTab.route
        )
        return {
          headerTitle() {
            return <HeaderDropdownMenu />
          },
          headerTitleStyle: navigationStyles.headerTitleChildStyle,
          headerStyle: noShadow
            ? navigationStyles.headerStyle
            : navigationStyles.headerShadowStyle,
          headerRight() {
            return <HeaderRightShowDetails />
          },
        }
      },
    },
    'showDetails:schedule:event-details': {
      screen: ShowEventDetailsScreen,
      navigationOptions: () => ({
        headerTitle: 'Event Details',
        headerStyle: navigationStyles.headerShadowStyle,
      }),
    },
    'showDetails:travels:allTravels:detail': {
      screen: TravelDetailScreen,
      navigationOptions: () => ({
        headerTitle: 'Travel Details',
        headerStyle: navigationStyles.headerShadowStyle,
      }),
    },
    showTaskDetails: {
      screen: ShowTaskDetailsScreen,
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
    showPlaybook: {
      screen: ShowPlaybookScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle() {
          return <HeaderShowName />
        },
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.darkHeaderStyle,
        ],
        headerLeft() {
          return <BackButton goBack={navigation.goBack} />
        },
      }),
    },
    showSectionDetails: {
      screen: ShowSectionDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '',
        headerStyle: navigationStyles.headerStyle,
        headerLeft() {
          return <BackButton goBack={navigation.goBack} />
        },
      }),
    },
    addExpense: {
      screen: AddExpenseScreen,
      navigationOptions: {
        headerTitle: 'Add Expense',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
      },
    },
    showMemberDetails: {
      screen: ShowMemberDetailsScreen,
      navigationOptions: {
        headerTitle: 'User Details',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
      },
    },
    addMember: {
      screen: AddMemberScreen,
      navigationOptions: {
        headerTitle: 'Add User',
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.headerShadowStyle,
        ],
      },
    },
    showROIDetails: {
      screen: ShowROIDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam('headerTitle'),
        headerTitleStyle: navigationStyles.darkHeaderTitleStyle,
        headerStyle: [
          navigationStyles.headerStyle,
          navigationStyles.darkHeaderStyle,
        ],
        headerLeft() {
          return <BackButton goBack={navigation.goBack} />
        },
      }),
    },
    settings: {
      screen: SettingsTopTabNavigator,
      navigationOptions: {
        headerTitle: 'Settings',
      },
    },
  },
  {
    initialRouteName: 'shows',
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft() {
        return <BackButton goBack={navigation.goBack} />
      },
      headerBackTitleVisible: false,
      headerStyle: navigationStyles.headerStyle,
    }),
  }
)
