import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './travel.types'

export class TravelApi extends BaseApi {
  /**
   * Get travels
   */
  async getTravels(
    data: Types.GetTravelsRequest
  ): Promise<Types.GetTravelsResponse> {
    let url = `/organizations/${data.organizationID}/shows/${data.showID}/travels`
    if (data.userID) {
      url += `?userID=${data.userID}`
    }
    const response: ApiResponse<any> = await this.apisauceSecure.get(url)

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
   * Get travel by id
   */
  async getTravelById(
    data: Types.GetTravelByIdRequest
  ): Promise<Types.GetTravelByIdResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/travels/${data.travelID}`
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
