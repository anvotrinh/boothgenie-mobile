import { GeneralApiProblem } from '../api-problem'
import { UserProfileBase } from '../index'

export interface GetTasksRequest {
  organizationID: string
  userID: string
}

export interface GetTasksShowDetailsRequest {
  organizationID: string
  showID: string
  userID?: string
}

export interface UpdateTaskRequest {
  organizationID: string
  showID: string
  taskID: string
  body: UpdateTaskRequestBody
}

export interface UpdateTaskRequestBody {
  status: string
}

interface Show {
  _id: string
  showName: string
}

export interface Stage {
  _id: string
  name: string
}

export interface TaskAssignedUser extends UserProfileBase {
  roles: string[]
}

export interface Task {
  _id: string
  name: string
  dueDate: string
  description: string
  status: string
  showID: Show
  stageID: Stage
  taskAssignedUsers: TaskAssignedUser[]
}

export interface TasksResult {
  totalCount: number
  list: Task[]
}

export type GetTasksResponse =
  | { kind: 'ok'; data: TasksResult }
  | GeneralApiProblem

export type UpdateTaskResponse = { kind: 'ok' } | GeneralApiProblem
