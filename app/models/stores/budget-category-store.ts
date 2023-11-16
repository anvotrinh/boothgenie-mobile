import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetBudgetCategoriesResponse,
  CreateExpenseResponse,
  CreateResourceResponse,
  CreateExpenseBody,
} from '../../services/api'
import { RootStore } from '../root-store'
import { ImageSource } from '../../utils/image'

interface BudgetCategorySimple {
  id: string
}

export interface CreateExpenseRequest {
  budgetCategory: BudgetCategorySimple
  name: string
  attachment: ImageSource | null
  paymentDate: Date
  paymentAmount: string
}

const UserModel = types.model('User', {
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
})

const ExpenseModel = types.model('Expense', {
  name: types.string,
  paymentDate: types.string,
  expenseAmount: types.number,
  createdBy: UserModel,
})

const BudgetCategoryModel = types
  .model('BudgetCategory', {
    _id: types.string,
    name: types.string,
    plannedAmount: types.optional(types.number, 0),
    expenses: types.array(ExpenseModel),
  })
  .views(self => ({
    get actual() {
      return self.expenses.reduce(
        (sum, expense) => sum + expense.expenseAmount,
        0
      )
    },
  }))

const BudgetCategoryDataModel = types.model('BudgetCategoryData', {
  totalCount: types.number,
  list: types.array(BudgetCategoryModel),
})

const defaultBudgetCategoryData = {
  totalCount: 0,
  list: [],
}

export const ButgetCategoryStoreModel = types
  .model('BudgetCategoryStore', {
    getBudgetCategoriesLoading: false,
    createExpenseLoading: false,
    budgetCategoriesData: types.optional(
      BudgetCategoryDataModel,
      defaultBudgetCategoryData
    ),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return getParent<RootStore>(self).userStore.userProfile.organizationID
    },
    get navigationStore() {
      return getParent<RootStore>(self).navigationStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getBudgetCategories: flow(function* getBudgetCategories(showID: string) {
      self.getBudgetCategoriesLoading = true
      const response: GetBudgetCategoriesResponse = yield self.api.budgetCategoryApi.getBudgetCategories(
        {
          organizationID: self.organizationID,
          showID,
        }
      )
      self.getBudgetCategoriesLoading = false

      if (response.kind === 'ok') {
        self.budgetCategoriesData = {
          totalCount: response.data.totalCount,
          list: response.data.list,
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),
    createExpense: flow(function* createExpense(
      showID: string,
      {
        budgetCategory,
        name,
        attachment,
        paymentDate,
        paymentAmount,
      }: CreateExpenseRequest
    ) {
      self.createExpenseLoading = true
      // upload resource
      let resourceIDs = [] as string[]
      if (attachment) {
        const formData = new FormData()
        formData.append('resources', {
          uri: attachment.uri,
          name: 'image-name.png',
          type: 'image/png',
        })
        const responseResource: CreateResourceResponse = yield self.api.resourceApi.createResource(
          {
            organizationID: self.organizationID,
            showID,
            formData,
          }
        )
        if (responseResource.kind === 'ok') {
          resourceIDs = responseResource.data.map(resource => resource._id)
        } else {
          self.showMessage({
            type: 'danger',
            message: 'Error',
            description: responseResource.message,
          })
          return
        }
      }

      // create expense
      const createExpenseBody: CreateExpenseBody = {
        name,
        paymentDate: paymentDate.toISOString(),
        expenseAmount: parseInt(paymentAmount),
      }
      if (resourceIDs.length > 0) {
        createExpenseBody.resourceIDs = resourceIDs
      }
      const response: CreateExpenseResponse = yield self.api.expenseApi.createExpense(
        {
          organizationID: self.organizationID,
          showID,
          budgetCategoryID: budgetCategory.id,
          body: createExpenseBody,
        }
      )
      self.createExpenseLoading = false

      if (response.kind === 'ok') {
        self.getBudgetCategories(showID)
        self.navigationStore.goBack()
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Add expense success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),
  }))

export type BudgetCategoryStore = Instance<typeof ButgetCategoryStoreModel>
