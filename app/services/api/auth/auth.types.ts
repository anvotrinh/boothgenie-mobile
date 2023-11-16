import { GeneralApiProblem } from '../api-problem'

export interface LoginByEmailRequest {
  email: string
  password: string
}

type LoginResponse = { kind: 'ok'; data: string } | GeneralApiProblem

export type LoginByEmailResponse = LoginResponse

export interface LogoutRequest {
  token: string
}

export type LogoutResponse = { kind: 'ok' } | GeneralApiProblem

export interface LoginByGoogleRequest {
  googleTokenID: string
}

export type LoginByGoogleResponse = LoginResponse
