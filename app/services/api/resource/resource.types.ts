import { GeneralApiProblem } from '../api-problem'

/**
 * Create resource
 */
export interface CreateResourceRequest {
  organizationID: string
  showID: string
  formData: FormData
}

export interface Resource {
  _id: string
}

export type CreateResourceResponse =
  | { kind: 'ok'; data: Resource[] }
  | GeneralApiProblem
