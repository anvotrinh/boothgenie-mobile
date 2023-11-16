import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './roi.types'

export class ROIApi extends BaseApi {
  async updateROI(
    data: Types.UpdateROIRequest
  ): Promise<Types.UpdateROIResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      `/organizations/${data.organizationID}/shows/${data.showID}/rois/${data.roiID}`,
      data.body
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok', data: response.data }
  }
}
