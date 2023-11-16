import { GeneralApiProblem } from '../api-problem'
import { UserProfile, Location, ROI } from '../index'

/**
 * Get shows
 */
export interface GetShowsRequest {
  organizationID: string
  status: 'UPCOMING' | 'COMMITED' | 'COMPLETE'
}

interface TaskCount {
  count: number
}

export interface TaskData {
  completedTasks: TaskCount[]
  overDueTasks: TaskCount[]
  totalCount: TaskCount[]
}

export interface Show {
  _id: string
  showName: string
  description: string
  startDate: string
  endDate: string
  status: string
  location: Location
  taskData: TaskData[]
  showStaffers: UserProfile[]
  managedBy: UserProfile[]
  website?: string
  venueFloorplan: string
  quickfactsLink: string
  roiID: ROI[]
}

export interface ShowsResult {
  totalCount: number
  list: Show[]
}

export type GetShowsResponse =
  | { kind: 'ok'; data: ShowsResult }
  | GeneralApiProblem

export interface GetShowByIdRequest {
  organizationID: string
  showID: string
}

export type GetShowByIdResponse = { kind: 'ok'; data: Show } | GeneralApiProblem

export interface ShowDetailsTab {
  title: string
  route: string
}

export interface InviteUserToShowRequestBody {
  email: string
  role: string
  firstName: string
  lastName: string
}

export interface InviteUserToShowRequest {
  organizationID: string
  showID: string
  body: InviteUserToShowRequestBody
}

export type InviteUserToShowResponse = { kind: 'ok' } | GeneralApiProblem
