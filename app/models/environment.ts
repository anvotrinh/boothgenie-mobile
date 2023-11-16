import { ApiResponse } from 'apisauce'
import { Api } from '../services/api'
import { MessageOptions, showMessage } from '../components'

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require('../services/reactotron')
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.api = new Api()
    this.showMessage = showMessage
  }

  async setup(
    accessToken?: string,
    monitorFn?: (response: ApiResponse<any>) => void
  ) {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    if (accessToken) {
      monitorFn
        ? this.api.setupSecureRequest(accessToken, monitorFn)
        : this.api.setupSecureRequest(accessToken)
    }
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: Api

  /**
   * show flash message.
   */
  showMessage: (messageOptions: MessageOptions) => void
}
