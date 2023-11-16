import { GeneralApiProblem } from '../api-problem'

/**
 * Request reset password
 */
export interface RequestResetPasswordRequest {
  email: string
  captcha: string
}

export type RequestResetPasswordResponse = { kind: 'ok' } | GeneralApiProblem

/**
 * Get current user profile
 */
export interface UserRole {
  _id: string
  roleName: string
  scopes: string[]
}

export interface UserProfileBase {
  _id: string
  email: string
  firstName: string
  lastName: string
  organizationID: string
  phoneNumber: string
  profilePhoto?: string | null
  title: string
}

export interface UserProfile extends UserProfileBase {
  roles: UserRole[]
}

export type UserProfileResponse =
  | { kind: 'ok'; data: UserProfile }
  | GeneralApiProblem

/**
 * Update profile
 */
export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  title: string
  phoneNumber: string
}

export type UpdateProfileResponse =
  | { kind: 'ok'; data: UserProfile }
  | GeneralApiProblem

/**
 * Update password
 */
export interface UpdatePasswordRequest {
  password: string
  oldPassword: string
  captcha: string
}

export interface UpdatePasswordResult {
  accessToken: string
}

export type UpdatePasswordResponse =
  | { kind: 'ok'; data: UpdatePasswordResult }
  | GeneralApiProblem

/**
 * Upload profile photo
 */
export interface UploadProfilePhotoRequest {
  formData: FormData
}

export type UploadProfilePhotoResponse = { kind: 'ok' } | GeneralApiProblem
