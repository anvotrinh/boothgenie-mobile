import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetShowByIdResponse,
  GetShowsResponse,
  Show,
  ShowDetailsTab,
  InviteUserToShowRequestBody,
} from '../../services/api'
import { RootStore } from '../root-store'
import { defaultUserProfile, UserProfileModel } from './user-store'
import { defaultLocation, LocationModel } from './event-store'
import { defaultROI, ROIModel } from './roi-store'
import { clone } from '../../utils/object'
import { session } from '../../utils/session'

const TaskCountModel = types.model('TaskCount', {
  count: types.number,
})

const defaultTaskCount = {
  count: 0,
}

const TaskDataModel = types.model('TaskData', {
  completedTasks: types.array(types.optional(TaskCountModel, defaultTaskCount)),
  overDueTasks: types.array(types.optional(TaskCountModel, defaultTaskCount)),
  totalCount: types.array(types.optional(TaskCountModel, defaultTaskCount)),
})

const defaultTaskData = {
  completedTasks: [defaultTaskCount],
  overDueTasks: [defaultTaskCount],
  totalCount: [defaultTaskCount],
}

const ShowModel = types.model('Show', {
  _id: types.string,
  showName: types.string,
  description: types.string,
  startDate: types.string,
  endDate: types.string,
  status: types.string,
  location: types.optional(LocationModel, defaultLocation),
  taskData: types.array(types.optional(TaskDataModel, defaultTaskData)),
  showStaffers: types.array(
    types.optional(UserProfileModel, defaultUserProfile)
  ),
  managedBy: types.array(types.optional(UserProfileModel, defaultUserProfile)),
  website: types.optional(types.string, ''),
  venueFloorplan: types.string,
  quickfactsLink: types.string,
  roiID: types.array(types.optional(ROIModel, defaultROI)),
})

const defaultShow = {
  _id: '',
  showName: '',
  description: '',
  startDate: '',
  endDate: '',
  status: '',
  location: defaultLocation,
  taskData: [],
  showStaffers: [],
  managedBy: [],
  website: '',
  venueFloorplan: '',
  quickfactsLink: '',
  roiID: [],
}

const ShowDataModel = types.model('ShowData', {
  totalCount: types.number,
  list: types.array(ShowModel),
})

const defaultShowData = {
  totalCount: 0,
  list: [],
}

const ShowDetailsTabModel = types.model('ShowDetailsTab', {
  title: types.string,
  route: types.string,
})

const defaultShowDetailsTab = {
  title: 'Overview',
  route: 'showDetails:overview',
}

export const ShowStoreModel = types
  .model('ShowStore', {
    getShowByIdLoading: false,
    inProgressShowsData: types.optional(ShowDataModel, defaultShowData),
    inProgressShowsLoading: false,
    selectedShowDetailsTab: types.optional(
      ShowDetailsTabModel,
      defaultShowDetailsTab
    ),
    showDetails: types.optional(ShowModel, defaultShow),
    upcomingShowsData: types.optional(ShowDataModel, defaultShowData),
    upcomingShowsLoading: false,
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
    getInProgressShows: flow(function* getInProgressShows() {
      self.inProgressShowsLoading = true
      const response: GetShowsResponse = yield self.api.showApi.getShows({
        organizationID: self.organizationID,
        status: 'COMMITED',
      })
      self.inProgressShowsLoading = false

      if (response.kind === 'ok') {
        self.inProgressShowsData = {
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

    getUpcomingShows: flow(function* getUpcomingShows() {
      self.upcomingShowsLoading = true
      const response: GetShowsResponse = yield self.api.showApi.getShows({
        organizationID: self.organizationID,
        status: 'UPCOMING',
      })
      self.upcomingShowsLoading = false

      if (response.kind === 'ok') {
        self.upcomingShowsData = {
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

    getShowById: flow(function* getShowById(showID: string) {
      self.getShowByIdLoading = true
      const response: GetShowByIdResponse = yield self.api.showApi.getShowById({
        organizationID: self.organizationID,
        showID,
      })
      self.getShowByIdLoading = false

      if (response.kind === 'ok') {
        self.showDetails = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    inviteUserToShow: flow(function* inviteUserToShow(
      showID: string,
      userBody: InviteUserToShowRequestBody
    ) {
      const response: GetShowByIdResponse = yield self.api.showApi.inviteUserToShow(
        {
          organizationID: self.organizationID,
          showID,
          body: userBody,
        }
      )

      if (response.kind === 'ok') {
        self.getShowById(showID)
        self.navigationStore.goBack()
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Add user success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    setShowDetails(show: Show) {
      self.showDetails = clone(show)
    },

    clearShowDetails() {
      self.showDetails = defaultShow
    },

    setSelectedShowDetailsTab(selectedTab: ShowDetailsTab) {
      self.selectedShowDetailsTab = selectedTab
      session.set('selectedShowDetailsTab', selectedTab)
    },
  }))

export type ShowStore = Instance<typeof ShowStoreModel>
