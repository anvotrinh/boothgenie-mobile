import { ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from '../api-problem'
import { BaseApi } from '../api-base'
import * as Types from './budget-category.types'

export class BudgetCategoryApi extends BaseApi {
  async getBudgetCategories(
    data: Types.GetBudgetCategoriesRequest
  ): Promise<Types.GetBudgetCategoriesResponse> {
    const response: ApiResponse<any> = await this.apisauceSecure.get(
      `/organizations/${data.organizationID}/shows/${data.showID}/budgetCategories`
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
