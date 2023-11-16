import { GeneralApiProblem } from '../api-problem'
import { Airport, Location } from '../index'
import { UserProfile } from '../user/user.types'

/**
 * Get travels
 */
export interface GetTravelsRequest {
  organizationID: string
  showID: string
  userID?: string
}

export interface TimeAndAirport {
  time: string
  airPortID: string
  airport?: Airport
}

export interface TimeTravel {
  arrival: TimeAndAirport
  departure: TimeAndAirport
}

export interface TimePack {
  going: TimeTravel
  returning: TimeTravel
}

export interface Flight {
  _id: string
  airline: string
  confirmationNumber: string
  departureDate: string
  departureAirport: Airport
  arrivalDate: string
  arrivalAirport: Airport
  flightNumber: string
  seat: string
}

export interface Lodging {
  _id: string
  confirmationCode: string
  lodgingName: string
  checkinDate: string
  checkoutDate: string
  showID: string
  location: Location
  travelerID: UserProfile
}

export interface Travel {
  _id: string
  flightIDs: Flight[]
  lodgingIDs: Lodging[]
  userID: string
  showID: string
}

export interface TravelDetails {
  _id: string
  flightIDs: Flight[]
  lodgingIDs: Lodging[]
  userID: string
  showID: string
}

export interface TravelsResult {
  totalCount: number
  list: Travel[]
}

export type GetTravelsResponse =
  | { kind: 'ok'; data: TravelsResult }
  | GeneralApiProblem

/**
 * Get travel by id
 */
export interface GetTravelByIdRequest {
  organizationID: string
  showID: string
  travelID: string
}

export type GetTravelByIdResponse =
  | { kind: 'ok'; data: TravelDetails }
  | GeneralApiProblem
