import { GeneralApiProblem } from '../api-problem'

/**
 * Create expense
 */
export interface CreateExpenseRequest {
  organizationID: string
  showID: string
  budgetCategoryID: string
  body: CreateExpenseBody
}

export interface CreateExpenseBody {
  name: string
  paymentDate: string
  resourceIDs?: string[]
  expenseAmount: number
}

interface User {
  _id: string
  firstName: string
  lastName: string
  organizationID: string
}

export interface Expense {
  name: string
  paymentDate: string
  expenseAmount: number
  createdBy: User
}

export type CreateExpenseResponse =
  | { kind: 'ok'; data: Expense }
  | GeneralApiProblem
