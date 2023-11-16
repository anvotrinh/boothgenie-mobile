import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './auth.types'

export class AuthApi extends BaseApi {
  /**
   * Login by email
   */
  async loginByEmail(
    data: Types.LoginByEmailRequest
  ): Promise<Types.LoginByEmailResponse> {
    const response: ApiResponse<any> = await this.apisaucePublic.post(
      '/auth/login',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data.accessToken }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Login by google
   */
  async loginByGoogle(
    data: Types.LoginByGoogleRequest
  ): Promise<Types.LoginByGoogleResponse> {
    const response: ApiResponse<any> = await this.apisaucePublic.post(
      '/auth/mobile/google',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data.accessToken }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Log out
   */
  async logout(data: Types.LogoutRequest): Promise<Types.LogoutResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      '/users/me/token/remove',
      data
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
