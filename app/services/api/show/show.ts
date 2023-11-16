import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './show.types'

export class ShowApi extends BaseApi {
  /**
   * Get shows
   */
  async getShows(data: Types.GetShowsRequest): Promise<Types.GetShowsResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows?status=${data.status}`
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // TODO: Remove when api fixed
    const responseData = { ...response.data }
    if (response.data?.list?.length > 0) {
      const list = response.data.list.filter((show: Types.Show) => {
        return show && typeof show.location === 'object'
      })
      responseData.list = list
    }

    try {
      return { kind: 'ok', data: responseData }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Get show by id
   */
  async getShowById(
    data: Types.GetShowByIdRequest
  ): Promise<Types.GetShowByIdResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}`
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
   * Invite user to show
   */
  async inviteUserToShow(
    data: Types.InviteUserToShowRequest
  ): Promise<Types.InviteUserToShowResponse> {
    const { role, ...rest } = data.body
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      `/organizations/${data.organizationID}/shows/${data.showID}/${role}s/invite`,
      rest
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
