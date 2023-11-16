import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './airport.types'

export class AirportApi extends BaseApi {
  /**
   * Get airports
   */
  async getAirports(): Promise<Types.GetAirportsResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      '/airports'
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
   * Get airport by id
   */
  async getAirportById(
    data: Types.GetAirportByIdRequest
  ): Promise<Types.GetAirportByIdResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/airports/${data.airportID}`
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
