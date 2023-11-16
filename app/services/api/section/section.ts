import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './section.types'

export class SectionApi extends BaseApi {
  async getSections(
    data: Types.GetSectionsRequest
  ): Promise<Types.GetSectionsResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/sections`
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // TODO: Remove when api fixed
    const responseData = { ...response.data }
    if (response.data?.list?.length > 0) {
      const list = response.data.list.filter(
        (section: Types.Section) => !!section
      )
      responseData.list = list
    }

    try {
      return { kind: 'ok', data: responseData }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }
}
