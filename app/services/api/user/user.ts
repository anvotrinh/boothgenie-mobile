import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './user.types'

export class UserApi extends BaseApi {
  /**
   * Request reset password
   */
  async requestResetPassword(
    data: Types.RequestResetPasswordRequest
  ): Promise<Types.RequestResetPasswordResponse> {
    const response: ApiResponse<any> = await this.apisaucePublic.post(
      '/users/me/password/reset',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }

  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<Types.UserProfileResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      '/users/me'
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Update profile
   */
  async updateProfile(
    data: Types.UpdateProfileRequest
  ): Promise<Types.UpdateProfileResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      '/users/me/update',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Update password
   */
  async updatePassword(
    data: Types.UpdatePasswordRequest
  ): Promise<Types.UpdatePasswordResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      '/users/me/password',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Upload profile photo
   */
  async uploadProfilePhoto(
    data: Types.UploadProfilePhotoRequest
  ): Promise<Types.UploadProfilePhotoResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.post(
      '/users/me/photo',
      data.formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
