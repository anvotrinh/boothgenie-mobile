import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './chat.types'

export class ChatApi extends BaseApi {
  async sendMessage(
    data: Types.SendChatMessageRequest
  ): Promise<Types.SendChatMessageResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.post(
      `/organizations/${data.organizationID}/rooms/${data.roomId}/messages`,
      { text: data.text }
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
