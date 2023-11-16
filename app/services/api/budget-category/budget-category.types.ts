import { GeneralApiProblem } from '../api-problem'
import { Expense } from '../index'

/**
 * Get budgetCategories
 */
export interface GetBudgetCategoriesRequest {
  organizationID: string
  showID: string
}

export interface BudgetCategory {
  _id: string
  name: string
  plannedAmount: number
  actual: number
  expenses: Expense[]
}

export interface BudgetCategoriesResult {
  totalCount: number
  list: BudgetCategory[]
}

export type GetBudgetCategoriesResponse =
  | { kind: 'ok'; data: BudgetCategoriesResult }
  | GeneralApiProblem
