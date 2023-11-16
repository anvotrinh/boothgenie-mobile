import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './expense.types'

export class ExpenseApi extends BaseApi {
  async createExpense(
    data: Types.CreateExpenseRequest
  ): Promise<Types.CreateExpenseResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.post(
      `/organizations/${data.organizationID}/shows/${data.showID}/budgetCategories/${data.budgetCategoryID}/expenses`,
      data.body
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: 'ok', data: response.data }
    } catch {
      return { kind: 'bad-data', message: 'Bad Data' }
    }
  }
}
