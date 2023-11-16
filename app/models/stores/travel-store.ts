import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetTravelsResponse,
  GetTravelByIdResponse,
  TravelDetails,
  TravelsResult,
} from '../../services/api'
import { RootStore } from '../root-store'
import { AirportModel, defaultAirport } from './airport-store'
import { UserProfileModel } from './user-store'
import { LocationModel } from './event-store'

const FlightModel = types.model('FlightModel', {
  _id: types.string,
  airline: types.string,
  confirmationNumber: types.string,
  departureDate: types.string,
  departureAirport: types.optional(AirportModel, defaultAirport),
  arrivalDate: types.string,
  arrivalAirport: types.optional(AirportModel, defaultAirport),
  flightNumber: types.string,
  seat: types.string,
})

const LodgingModel = types.model('LodgingModel', {
  _id: types.string,
  confirmationCode: types.string,
  lodgingName: types.string,
  checkinDate: types.string,
  checkoutDate: types.string,
  showID: types.string,
  location: LocationModel,
  travelerID: types.frozen(),
})

const TravelModel = types.model('Travel', {
  _id: types.string,
  flightIDs: types.array(FlightModel),
  lodgingIDs: types.array(LodgingModel),
  userID: types.string,
  showID: types.string,
  user: types.maybeNull(UserProfileModel),
})

const TravelDetailsModel = types.model('TravelDetailsModel', {
  _id: types.string,
  flightIDs: types.array(FlightModel),
  lodgingIDs: types.array(LodgingModel),
  userID: types.string,
  showID: types.string,
  user: types.maybeNull(UserProfileModel),
})

const defaultTravelDetails: TravelDetails = {
  _id: '',
  flightIDs: [],
  lodgingIDs: [],
  userID: '',
  showID: '',
  user: undefined,
}

const TravelDataModel = types.model('TravelDataModel', {
  totalCount: types.number,
  list: types.array(TravelModel),
})

const defaultTravelData: TravelsResult = {
  totalCount: 0,
  list: [],
}

export const TravelStoreModel = types
  .model('TravelStore', {
    getAllTravelsLoading: false,
    getMyTravelsLoading: false,
    allTravels: types.optional(TravelDataModel, defaultTravelData),
    myTravels: types.optional(TravelDataModel, defaultTravelData),
    getTravelByIdLoading: false,
    travelDetails: types.optional(TravelDetailsModel, defaultTravelDetails),
  })
  .views(self => ({
    get airportStore() {
      return self.rootStore.airportStore
    },
    get showStore() {
      return self.rootStore.showStore
    },
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return self.rootStore.userStore.userProfile.organizationID
    },
    get rootStore() {
      return getParent<RootStore>(self)
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
    get userID() {
      return getParent<RootStore>(self).userStore.userProfile._id
    },
  }))
  .actions(self => ({
    getAllTravels: flow(function* getAllTravels(showID: string) {
      self.getAllTravelsLoading = true

      if (self.airportStore.airports.list.length === 0) {
        self.airportStore.getAirports()
      }

      const response: GetTravelsResponse = yield self.api.travelApi.getTravels({
        organizationID: self.organizationID,
        showID,
      })

      self.getAllTravelsLoading = false

      if (response.kind === 'ok') {
        self.allTravels = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    getMyTravels: flow(function* getMyTravels(showID: string) {
      self.getMyTravelsLoading = true

      if (self.airportStore.airports.list.length === 0) {
        self.airportStore.getAirports()
      }

      const response: GetTravelsResponse = yield self.api.travelApi.getTravels({
        organizationID: self.organizationID,
        showID,
        userID: self.userID,
      })

      self.getMyTravelsLoading = false

      if (response.kind === 'ok') {
        self.myTravels = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    getTravelById: flow(function* getTravelById(
      showID: string,
      travelID: string
    ) {
      self.getTravelByIdLoading = true
      const response: GetTravelByIdResponse = yield self.api.travelApi.getTravelById(
        {
          organizationID: self.organizationID,
          showID,
          travelID,
        }
      )
      self.getTravelByIdLoading = false

      if (response.kind === 'ok') {
        self.travelDetails = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    clearTravelDetails() {
      self.travelDetails = defaultTravelDetails
    },
  }))

export type TravelStore = Instance<typeof TravelStoreModel>
