import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './training.types'

export class TrainingApi extends BaseApi {
  /**
   * Get trainings
   */
  async getTrainings(
    data: Types.GetTrainingsRequest
  ): Promise<Types.GetTrainingsResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/training`
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      // TODO: REMOVE ME WHEN API ABLE TO SORT BY SHOWID
      const list = response.data.list.sort(
        (a: Types.Training, b: Types.Training) => a.showID > b.showID
      )
      const res = {
        ...response.data,
        list,
      }
      //
      return { kind: 'ok', data: res }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }

  /**
   * Complete lesson
   */
  async completeLesson(
    data: Types.CompleteLessonRequest
  ): Promise<Types.CompleteLessonResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      `/organizations/${data.organizationID}/training/${data.trainingID}/lessons/${data.lessonID}/completed`,
      { userIDs: [data.userID] }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
