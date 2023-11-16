import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
  UserProfile,
  UserProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateProfileResponse,
  UploadProfilePhotoResponse,
} from '../../services/api'
import { RootStore } from '../root-store'
import { ImageSource } from '../../utils/image'
import { session } from '../../utils/session'

const ROLES = {
  ADMIN: 'ADMIN',
  ORGANIZATION_MANAGER: 'ORGANIZATION_MANAGER',
  SHOW_MANAGER: 'SHOW_MANAGER',
  MEMBER: 'MEMBER',
  BASIC: 'BASIC',
}

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  title: string
  phoneNumber: string
  profilePhoto: ImageSource | null
}

export const defaultUserProfile: UserProfile = {
  _id: '',
  email: '',
  firstName: 'Pending',
  lastName: 'User',
  organizationID: '',
  phoneNumber: '',
  profilePhoto: '',
  title: '',
  roles: [],
}

const UserRoleModel = types.model('UserRole', {
  _id: types.optional(types.string, ''),
  roleName: types.optional(types.string, ''),
  scopes: types.array(types.string),
})

export const UserProfileModel = types.model('UserProfile', {
  _id: types.string,
  email: types.string,
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  organizationID: types.string,
  phoneNumber: types.optional(types.string, ''),
  profilePhoto: types.maybeNull(types.string),
  title: types.optional(types.string, ''),
  roles: types.array(UserRoleModel),
})

export const UserStoreModel = types
  .model('UserStore', {
    userProfile: types.optional(UserProfileModel, defaultUserProfile),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get navigationStore() {
      return getParent<RootStore>(self).navigationStore
    },
    get authStore() {
      return getParent<RootStore>(self).authStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
    get userRoles() {
      return self.userProfile.roles
    },
    get isAdmin() {
      return !!self.userRoles.find(role => role.roleName === ROLES.ADMIN)
    },
    get isOrganizationManager() {
      return !!self.userRoles.find(
        role => role.roleName === ROLES.ORGANIZATION_MANAGER
      )
    },
    get isInternalUser() {
      return self.isAdmin || self.isOrganizationManager
    },
    get isShowManager() {
      return !!self.userRoles.find(role => role.roleName === ROLES.SHOW_MANAGER)
    },
  }))
  .actions(self => ({
    requestResetPassword: flow(function* requestResetPassword(
      data: RequestResetPasswordRequest
    ) {
      const response: RequestResetPasswordResponse = yield self.api.userApi.requestResetPassword(
        data
      )
      if (response.kind === 'ok') {
        self.navigationStore.navigateTo({ routeName: 'login' })
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'A link has been sent to reset your password',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    getUserProfile: flow(function* getUserProfile() {
      const response: UserProfileResponse = yield self.api.userApi.getUserProfile()
      if (response.kind === 'ok') {
        self.setUserProfile(response.data)
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    updateProfile: flow(function* updateProfile({
      profilePhoto,
      ...profile
    }: UpdateProfileRequest) {
      // upload profile photo
      if (profilePhoto && !profilePhoto.uri.startsWith('http')) {
        const formData = new FormData()
        formData.append('photo', {
          uri: profilePhoto.uri,
          name: 'image-name.png',
          type: 'image/png',
        })
        const responseUpload: UploadProfilePhotoResponse = yield self.api.userApi.uploadProfilePhoto(
          {
            formData,
          }
        )
        if (responseUpload.kind !== 'ok') {
          self.showMessage({
            type: 'danger',
            message: 'Error',
            description: responseUpload.message,
          })
          return
        }
      }

      // update profile
      const response: UpdateProfileResponse = yield self.api.userApi.updateProfile(
        profile
      )

      if (response.kind === 'ok') {
        self.setUserProfile(response.data)
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Update profile success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    updatePassword: flow(function* updatePassword(data: UpdatePasswordRequest) {
      const result: UpdatePasswordResponse = yield self.api.userApi.updatePassword(
        data
      )

      if (result.kind === 'ok') {
        self.authStore.setAccessToken(result.data.accessToken)
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Update password success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: result.message,
        })
      }
      return result.kind === 'ok'
    }),

    clearUserProfile() {
      self.setUserProfile(defaultUserProfile)
    },

    setUserProfile(profile: UserProfile) {
      self.userProfile = profile
      session.set('isInternalUser', self.isInternalUser)
    },
  }))

export type UserStore = Instance<typeof UserStoreModel>
