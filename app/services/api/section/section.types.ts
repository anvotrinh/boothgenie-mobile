import { GeneralApiProblem } from '../api-problem'

export interface GetSectionsRequest {
  organizationID: string
  showID: string
}

export interface Section {
  _id: string
  name: string
  content: string
  type: string
}

export interface SectionsResult {
  totalCount: number
  list: Section[]
}

export type GetSectionsResponse =
  | { kind: 'ok'; data: SectionsResult }
  | GeneralApiProblem
