import { Instance, types } from 'mobx-state-tree'
import {
  NavigationActions,
  NavigationAction,
  NavigationNavigateActionPayload,
} from 'react-navigation'
import { PrimaryNavigator } from '../../navigation/primary-navigator'
import { NavigationEvents } from '../../navigation/navigation-events'

const DEFAULT_STATE = PrimaryNavigator.router.getStateForAction(
  NavigationActions.init(),
  null
)

/**
 * Finds the current route.
 *
 * @param navState the current nav state
 */
function findCurrentRoute(navState) {
  const route = navState.routes[navState.index]
  if (route.routes) {
    return findCurrentRoute(route)
  }
  return route
}

/**
 * Tracks the navigation state for `react-navigation` as well as providers
 * the actions for changing that state.
 */
export const NavigationStoreModel = NavigationEvents.named('NavigationStore')
  .props({
    /**
     * the navigation state tree (Frozen here means it is immutable.)
     */
    state: types.optional(types.frozen(), DEFAULT_STATE),
  })
  .preProcessSnapshot(snapshot => {
    if (!snapshot || !snapshot.state) return snapshot

    try {
      // make sure react-navigation can handle our state
      PrimaryNavigator.router.getPathAndParamsForState(snapshot.state)
      return snapshot
    } catch (e) {
      // otherwise restore default state
      return { ...snapshot, state: DEFAULT_STATE }
    }
  })
  .actions(self => ({
    /**
     * Return all subscribers
     */
    actionSubscribers() {
      return self.subs
    },

    /**
     * Fires when navigation happens.
     *
     * Our job is to update the state for this new navigation action.
     *
     * @param action The new navigation action to perform
     * @param shouldPush Should we push or replace the whole stack?
     */
    dispatch(action: NavigationAction, shouldPush = true) {
      const previousNavState = shouldPush ? self.state : null
      self.state =
        PrimaryNavigator.router.getStateForAction(action, previousNavState) ||
        self.state
      self.fireSubscribers(action, previousNavState, self.state)
      return true
    },

    /**
     * Resets the navigation back to the start.
     */
    reset() {
      self.state = DEFAULT_STATE
    },

    /**
     * Finds the current route.
     */
    findCurrentRoute() {
      return findCurrentRoute(self.state)
    },
  }))
  .actions(self => ({
    /**
     * Navigate to another place.
     *
     * @param routeName The route name.
     */
    navigateTo(options: NavigationNavigateActionPayload) {
      self.dispatch(NavigationActions.navigate(options))
    },
    // go Back
    goBack(options: NavigationNavigateActionPayload) {
      self.dispatch(NavigationActions.back(options))
    },
  }))

export type NavigationStore = Instance<typeof NavigationStoreModel>
