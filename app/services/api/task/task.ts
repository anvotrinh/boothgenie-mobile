import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './task.types'

export class TaskApi extends BaseApi {
  async getTasks(data: Types.GetTasksRequest): Promise<Types.GetTasksResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/tasks?taskAssignedUsers[]=${data.userID}`
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      // REMOVE ME WHEN API ABLE TO SORT BY DUEDATE
      const list = response.data.list.sort(
        (a: Types.Task, b: Types.Task) =>
          new Date(a.dueDate).getTime() > new Date(b.dueDate).getTime()
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

  async getTasksShowDetails(
    data: Types.GetTasksShowDetailsRequest
  ): Promise<Types.GetTasksResponse> {
    let apiUrl = `/organizations/${data.organizationID}/shows/${data.showID}/tasks`
    if (data.userID) {
      apiUrl += `?taskAssignedUsers[]=${data.userID}`
    }
    const response: ApiResponse<any> = await this.apisauceSecure.get(apiUrl)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      // REMOVE ME WHEN API ABLE TO SORT BY STAGEID
      const list = response.data.list.sort(
        (a: Types.Task, b: Types.Task) => a.stageID._id > b.stageID._id
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

  async updateTask(
    data: Types.UpdateTaskRequest
  ): Promise<Types.UpdateTaskResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.put(
      `/organizations/${data.organizationID}/shows/${data.showID}/tasks/${data.taskID}`,
      data.body
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: 'ok' }
  }
}
