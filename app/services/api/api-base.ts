import { ApisauceInstance } from 'apisauce'

export interface BaseApiProps {
  apisaucePublic: ApisauceInstance
  apisauceSecure: ApisauceInstance
}

/**
 * Manages all requests to the API.
 */
export class BaseApi {
  /**
   * The underlying apisauce instance which performs public requests.
   */
  apisaucePublic: ApisauceInstance

  /**
   * The underlying apisauce instance which performs secure requests.
   */
  apisauceSecure: ApisauceInstance

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor({ apisaucePublic, apisauceSecure }: Props) {
    this.apisaucePublic = apisaucePublic
    this.apisauceSecure = apisauceSecure
  }
}
