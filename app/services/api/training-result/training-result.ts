import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './training-result.types'

export class TrainingResultApi extends BaseApi {
  /**
   * Get training results by user
   */
  async getTrainingResultsByUser(
    data: Types.GetTrainingResultsByUserRequest
  ): Promise<Types.GetTrainingResultsByUserResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/users/${data.userID}/results`
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
   * Create training result
   */
  async createTrainingResult(
    data: Types.CreateTrainingResultRequest
  ): Promise<Types.CreateTrainingResultResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.post(
      `/organizations/${data.organizationID}/shows/${data.showID}/training/${data.trainingID}/results`,
      { status: 'COMPLETED' }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
