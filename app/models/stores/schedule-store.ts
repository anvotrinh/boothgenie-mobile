import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetSchedulesResponse,
  GetScheduleByIdResponse,
  ScheduleDetails,
  SchedulesResult,
} from '../../services/api'
import { RootStore } from '../root-store'
import { EventModel } from './event-store'

const ScheduleModel = types.model('Schedule', {
  _id: types.string,
  scheduleDate: types.string,
  eventIDs: types.array(types.string),
})

const ScheduleDetailsModel = types.model('Schedule', {
  _id: types.string,
  scheduleDate: types.string,
  eventIDs: types.array(EventModel),
})

const defaultScheduleDetails: ScheduleDetails = {
  _id: '',
  scheduleDate: '',
  eventIDs: [],
}

const ScheduleDataModel = types.model('ScheduleData', {
  totalCount: types.number,
  list: types.array(ScheduleModel),
})

const defaultScheduleData: SchedulesResult = {
  totalCount: 0,
  list: [],
}

export const ScheduleStoreModel = types
  .model('ScheduleStore', {
    getSchedulesLoading: false,
    schedules: types.optional(ScheduleDataModel, defaultScheduleData),
    getScheduleByIdLoading: false,
    scheduleDetails: types.optional(
      ScheduleDetailsModel,
      defaultScheduleDetails
    ),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return getParent<RootStore>(self).userStore.userProfile.organizationID
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getSchedules: flow(function* getSchedules(showID: string) {
      self.getSchedulesLoading = true
      const response: GetSchedulesResponse = yield self.api.scheduleApi.getSchedules(
        {
          organizationID: self.organizationID,
          showID,
        }
      )
      self.getSchedulesLoading = false

      if (response.kind === 'ok') {
        self.schedules = response.data
        if (self.schedules.list.length > 0) {
          const [firstSchedule] = self.schedules.list
          yield self.getScheduleById(showID, firstSchedule._id)
        } else {
          self.clearScheduleDetails()
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    getScheduleById: flow(function* getScheduleById(
      showID: string,
      scheduleID: string
    ) {
      self.getScheduleByIdLoading = true
      const response: GetScheduleByIdResponse = yield self.api.scheduleApi.getScheduleById(
        {
          organizationID: self.organizationID,
          showID,
          scheduleID,
        }
      )
      self.getScheduleByIdLoading = false

      if (response.kind === 'ok') {
        self.scheduleDetails = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    clearScheduleDetails() {
      self.scheduleDetails = defaultScheduleDetails
    },
  }))

export type ScheduleStore = Instance<typeof ScheduleStoreModel>
