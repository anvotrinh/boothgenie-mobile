import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  LoginByEmailRequest,
  LoginByEmailResponse,
  LoginByGoogleRequest,
  LoginByGoogleResponse,
} from '../../services/api'
import { RootStore } from '../root-store'

export const AuthStoreModel = types
  .model('AuthStore', {
    accessToken: '',
    loginByEmailLoading: false,
    loginByGoogleLoading: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get authenticated() {
      return Boolean(self.accessToken && self.userStore.userProfile._id)
    },
    get navigationStore() {
      return self.rootStore.navigationStore
    },
    get rootStore() {
      return getParent<RootStore>(self)
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
    get userStore() {
      return self.rootStore.userStore
    },
    get chatStore() {
      return self.rootStore.chatStore
    },
  }))
  .actions(self => ({
    loginByEmail: flow(function* loginWithEmail(data: LoginByEmailRequest) {
      self.loginByEmailLoading = true
      const response: LoginByEmailResponse = yield self.api.authApi.loginByEmail(
        data
      )
      if (response.kind === 'ok') {
        yield self.setupForLogin(response.data)
      } else {
        self.accessToken = ''
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
      self.loginByEmailLoading = false
    }),

    loginByGoogle: flow(function* loginWithGoogle(data: LoginByGoogleRequest) {
      self.loginByGoogleLoading = true
      const response: LoginByGoogleResponse = yield self.api.authApi.loginByGoogle(
        data
      )
      if (response.kind === 'ok') {
        yield self.setupForLogin(response.data)
      } else {
        self.accessToken = ''
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
      self.loginByGoogleLoading = false
    }),

    logout() {
      self.rootStore.reset()
      self.chatStore?.disconnect()
      self.navigationStore.navigateTo({ routeName: 'Auth' })
      // self.api.authApi.logout({ token: self.accessToken })
    },

    setupForLogin: flow(function* setupForLogin(accessToken) {
      self.accessToken = accessToken
      self.api.setupSecureRequest(self.accessToken, response => {
        if (response.status === 401) {
          self.showMessage({
            type: 'danger',
            message: 'Session expired',
          })
          self.logout()
        }
      })
      yield self.userStore.getUserProfile()
      if (self.authenticated) {
        self.chatStore.initChatUser()
        self.navigationStore.navigateTo({ routeName: 'App' })
      }
    }),

    setAccessToken(accessToken: string) {
      self.accessToken = accessToken
      self.api.setupSecureRequest(accessToken)
    },
  }))

export type AuthStore = Instance<typeof AuthStoreModel>
