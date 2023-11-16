import { GeneralApiProblem } from '../api-problem'

/**
 * Get training results by user
 */
export interface GetTrainingResultsByUserRequest {
  organizationID: string
  showID: string
  userID: string
}

interface Training {
  _id: string
}

interface Show {
  _id: string
  showName: string
}

export interface TrainingResult {
  _id: string
  status: string
  showID: Show
  trainingTaskID: Training
}

export interface TrainingResultsData {
  totalCount: number
  list: TrainingResult[]
}

export type GetTrainingResultsByUserResponse =
  | { kind: 'ok'; data: TrainingResultsData }
  | GeneralApiProblem

/**
 * Create training result
 */
export interface CreateTrainingResultRequest {
  organizationID: string
  showID: string
  trainingID: string
}

export type CreateTrainingResultResponse = { kind: 'ok' } | GeneralApiProblem
