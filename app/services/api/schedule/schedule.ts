import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './schedule.types'

export class ScheduleApi extends BaseApi {
  /**
   * Get shows
   */
  async getSchedules(
    data: Types.GetSchedulesRequest
  ): Promise<Types.GetSchedulesResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/schedules`
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
   * Get show by id
   */
  async getScheduleById(
    data: Types.GetScheduleByIdRequest
  ): Promise<Types.GetScheduleByIdResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/schedules/${data.scheduleID}`
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
}
