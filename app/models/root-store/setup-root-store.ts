import { onSnapshot } from 'mobx-state-tree'
import { RootStoreModel, RootStore } from './root-store'
import { Environment } from '../environment'
import * as storage from '../../utils/storage'
import { session } from '../../utils/session'

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root'

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = new Environment()
  try {
    // load data from storage
    await session.init()
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    rootStore = RootStoreModel.create(data, env)
    const {
      authStore: { accessToken, logout },
    } = rootStore
    await env.setup(accessToken, response => {
      if (response.status === 401) {
        self.showMessage({
          type: 'danger',
          message: 'Session expired',
        })
        logout()
      }
    })
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot =>
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
  )

  return rootStore
}
