import { GeneralApiProblem } from '../api-problem'

/**
 * Get trainings
 */
export interface GetTrainingsRequest {
  organizationID: string
}

interface User {
  _id: string
}

interface TrainingUser {
  _id: string
  userID: User
  completedLessons: string[]
}

export interface Question {
  title: string
  options: string[]
  answer: number[]
  type: 'MULTIPLE_CHOICE' | 'MULTI_SELECT'
}

interface Provider {
  youtube: string
}

interface Document {
  _id: string
  provider: Provider
}

export interface Lesson {
  _id: string
  name: string
  content: string
  documents: Document[]
}

export interface Training {
  _id: string
  name: string
  showID: string
  lessons: Lesson[]
  questionIDs: Question[]
  users: TrainingUser[]
}

export interface TrainingsResult {
  totalCount: number
  list: Training[]
}

export type GetTrainingsResponse =
  | { kind: 'ok'; data: TrainingsResult }
  | GeneralApiProblem

/**
 * Complete lesson
 */
export interface CompleteLessonRequest {
  organizationID: string
  trainingID: string
  lessonID: string
  userID: string
}

export type CompleteLessonResponse = { kind: 'ok' } | GeneralApiProblem
