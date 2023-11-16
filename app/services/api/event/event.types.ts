import { GeneralApiProblem } from '../api-problem'
import { UserProfileBase } from '../index'

/**
 * Get schedules
 */
export interface GetEventsRequest {
  organizationID: string
  showID: string
  scheduleID: string
}

export interface LatLng {
  lat: number
  lng: number
}

export interface Geometry {
  location: LatLng
}

export interface Location {
  geometry: Geometry
  name: string
  vicinity: string
  placeID: string
}

export interface Event {
  _id: string
  name: string
  description: string
  startTime: string
  endTime: string
  location: Location
}

export interface EventAssignees extends UserProfileBase {
  roles: string[]
}

export interface EventDetails {
  _id: string
  name: string
  description: string
  startTime: string
  endTime: string
  location: Location
  eventAssignees: EventAssignees[]
}

export interface EventsResult {
  totalCount: number
  list: Event[]
}

export type GetEventsResponse =
  | { kind: 'ok'; data: EventsResult }
  | GeneralApiProblem

/**
 * Get schedule by id
 */
export interface GetEventByIdRequest {
  organizationID: string
  showID: string
  scheduleID: string
  eventID: string
}

export type GetEventByIdResponse =
  | { kind: 'ok'; data: EventDetails }
  | GeneralApiProblem
