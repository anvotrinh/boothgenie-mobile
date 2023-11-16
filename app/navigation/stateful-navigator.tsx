import * as React from 'react'
import { observer } from 'mobx-react-lite'
import {
  getNavigation,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { useStores } from '../models/root-store'
import { PrimaryNavigator } from './primary-navigator'

let currentNavigation: NavigationScreenProp<NavigationState> | undefined

export const StatefulNavigator: React.FunctionComponent<{}> = observer(() => {
  const {
    navigationStore: { state, dispatch, actionSubscribers },
  } = useStores()

  currentNavigation = getNavigation(
    PrimaryNavigator.router,
    state,
    dispatch,
    actionSubscribers(),
    {},
    () => currentNavigation
  )
  return <PrimaryNavigator navigation={currentNavigation} />
})
