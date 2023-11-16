import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './resource.types'

export class ResourceApi extends BaseApi {
  async createResource(
    data: Types.CreateResourceRequest
  ): Promise<Types.CreateResourceResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.post(
      `/organizations/${data.organizationID}/shows/${data.showID}/resources`,
      data.formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
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
