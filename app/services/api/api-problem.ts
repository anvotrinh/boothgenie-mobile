import { ApiResponse } from 'apisauce'

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; message: string; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; message: string; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server'; message: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized'; message: string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden'; message: string }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found'; message: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected'; message: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; message: string; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data'; message: string }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<any>
): GeneralApiProblem | void {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return {
        kind: 'cannot-connect',
        message: 'Cannot connect',
        temporary: true,
      }
    case 'NETWORK_ERROR':
      return {
        kind: 'cannot-connect',
        message: 'Cannot connect',
        temporary: true,
      }
    case 'TIMEOUT_ERROR':
      return { kind: 'timeout', message: 'Timeout', temporary: true }
    case 'SERVER_ERROR':
      return { kind: 'server', message: 'Server error' }
    case 'UNKNOWN_ERROR':
      return {
        kind: 'unknown',
        message: 'Unknown error occurred',
        temporary: true,
      }
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 401:
          return { kind: 'unauthorized', message: 'Unauthorized' }
        case 403:
          return { kind: 'forbidden', message: 'Permission denied' }
        case 404:
          return { kind: 'not-found', message: 'Not Found' }
        default:
          return { kind: 'rejected', message: 'Rejected' }
      }
    case 'CANCEL_ERROR':
      return null
  }

  return null
}
