import { GeneralApiProblem } from '../api-problem'
import { Event } from '../index'

/**
 * Get schedules
 */
export interface GetSchedulesRequest {
  organizationID: string
  showID: string
}

export interface Schedule {
  _id: string
  scheduleDate: string
  eventIDs: string[]
}

export interface ScheduleDetails {
  _id: string
  scheduleDate: string
  eventIDs: Event[]
}

export interface SchedulesResult {
  totalCount: number
  list: Schedule[]
}

export type GetSchedulesResponse =
  | { kind: 'ok'; data: SchedulesResult }
  | GeneralApiProblem

/**
 * Get schedule by id
 */
export interface GetScheduleByIdRequest {
  organizationID: string
  showID: string
  scheduleID: string
}

export type GetScheduleByIdResponse =
  | { kind: 'ok'; data: ScheduleDetails }
  | GeneralApiProblem
