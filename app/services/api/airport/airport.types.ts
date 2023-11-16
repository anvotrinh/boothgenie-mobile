import { GeneralApiProblem } from '../api-problem'

/**
 * Get airports
 */

export interface Airport {
  _id: string
  name: string
  code: string
}

export interface AirportsResult {
  totalCount: number
  list: Airport[]
}

export type GetAirportsResponse =
  | { kind: 'ok'; data: AirportsResult }
  | GeneralApiProblem

/**
 * Get airport by id
 */
export interface GetAirportByIdRequest {
  airportID: string
}

export type GetAirportByIdResponse =
  | { kind: 'ok'; data: Airport }
  | GeneralApiProblem
