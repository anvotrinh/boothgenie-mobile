import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config'
import { BaseApiProps } from './api-base'
import { AuthApi } from './auth/auth'
import { ShowApi } from './show/show'
import { UserApi } from './user/user'
import { TaskApi } from './task/task'
import { SectionApi } from './section/section'
import { ScheduleApi } from './schedule/schedule'
import { EventApi } from './event/event'
import { TravelApi } from './travel/travel'
import { AirportApi } from './airport/airport'
import { BudgetCategoryApi } from './budget-category/budget-category'
import { ExpenseApi } from './expense/expense'
import { ResourceApi } from './resource/resource'
import { ROIApi } from './roi/roi'
import { ChatApi } from './chat/chat'
import { TrainingApi } from './training/training'
import { TrainingResultApi } from './training-result/training-result'

export class Api {
  private apisaucePublic: ApisauceInstance

  private apisauceSecure: ApisauceInstance

  private config: ApiConfig

  /**
   * Import all apis
   */
  authApi: AuthApi

  showApi: ShowApi

  userApi: UserApi

  taskApi: TaskApi

  sectionApi: SectionApi

  scheduleApi: ScheduleApi

  eventApi: EventApi

  travelApi: TravelApi

  airportApi: AirportApi

  budgetCategoryApi: BudgetCategoryApi

  expenseApi: ExpenseApi

  resourceApi: ResourceApi

  roiApi: ROIApi

  chatApi: ChatApi

  trainingApi: TrainingApi

  trainingResultApi: TrainingResultApi

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.setupPublicRequest()
    this.setupSecureRequest('')
  }

  // import all apis
  private setupApis(props: BaseApiProps) {
    this.authApi = new AuthApi(props)
    this.showApi = new ShowApi(props)
    this.userApi = new UserApi(props)
    this.taskApi = new TaskApi(props)
    this.sectionApi = new SectionApi(props)
    this.scheduleApi = new ScheduleApi(props)
    this.eventApi = new EventApi(props)
    this.travelApi = new TravelApi(props)
    this.airportApi = new AirportApi(props)
    this.budgetCategoryApi = new BudgetCategoryApi(props)
    this.expenseApi = new ExpenseApi(props)
    this.resourceApi = new ResourceApi(props)
    this.roiApi = new ROIApi(props)
    this.chatApi = new ChatApi(props)
    this.trainingApi = new TrainingApi(props)
    this.trainingResultApi = new TrainingResultApi(props)
  }

  private setupPublicRequest() {
    this.apisaucePublic = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  setupSecureRequest(
    accessToken: string,
    monitorFn?: (response: ApiResponse<any>) => void
  ) {
    this.apisauceSecure = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (monitorFn) {
      this.apisauceSecure.addMonitor(monitorFn)
    }
    this.setupApis({
      apisaucePublic: this.apisaucePublic,
      apisauceSecure: this.apisauceSecure,
    })
  }
}
