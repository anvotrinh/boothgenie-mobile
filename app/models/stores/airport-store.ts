import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetAirportByIdResponse,
  GetAirportsResponse,
  Airport,
} from '../../services/api'
import { RootStore } from '../root-store'

export const AirportModel = types.model('Airport', {
  _id: types.string,
  name: types.string,
  code: types.string,
})

export const defaultAirport: Airport = {
  _id: '',
  name: '',
  code: '',
}

const AirportDataModel = types.model('AirportData', {
  totalCount: types.number,
  list: types.array(AirportModel),
})

const defaultAirportData = {
  totalCount: 0,
  list: [],
}

export const AirportStoreModel = types
  .model('AirportStore', {
    getAirportsLoading: false,
    getAirportByIdLoading: false,
    airports: types.optional(AirportDataModel, defaultAirportData),
    airportDetails: types.optional(AirportModel, defaultAirport),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return getParent<RootStore>(self).userStore.userProfile.organizationID
    },
    get airportMessage() {
      return getEnv(self).airportMessage
    },
  }))
  .actions(self => ({
    getAirports: flow(function* getAirports() {
      self.getAirportsLoading = true
      const response: GetAirportsResponse = yield self.api.airportApi.getAirports()
      self.getAirportsLoading = false

      if (response.kind === 'ok') {
        self.airports = {
          totalCount: response.data.totalCount,
          list: response.data.list,
        }
      } else {
        self.airportMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    getAirportById: flow(function* getAirportById(airportID: string) {
      self.getAirportByIdLoading = true
      const response: GetAirportByIdResponse = yield self.api.airportApi.getAirportById(
        {
          airportID,
        }
      )
      self.getAirportByIdLoading = false

      if (response.kind === 'ok') {
        self.airportDetails = response.data
      } else {
        self.airportMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    clearAirportDetails() {
      self.airportDetails = defaultAirport
    },
  }))

export type AirportStore = Instance<typeof AirportStoreModel>
