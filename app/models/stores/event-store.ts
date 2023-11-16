import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetEventByIdResponse,
  Event,
  EventDetails,
  Geometry,
  LatLng,
  Location,
} from '../../services/api'
import { RootStore } from '../root-store'
import { clone } from '../../utils/object'

const LatLngModel = types.model('LatLng', {
  lat: types.number,
  lng: types.number,
})

const defaultLatLng: LatLng = {
  lat: 0,
  lng: 0,
}

const GeometryModel = types.model('Geometry', {
  location: types.optional(LatLngModel, defaultLatLng),
})

const defaultGeometry: Geometry = {
  location: defaultLatLng,
}

export const LocationModel = types.model('Location', {
  geometry: types.optional(GeometryModel, defaultGeometry),
  name: types.string,
  vicinity: types.string,
  placeID: types.string,
})

export const defaultLocation: Location = {
  geometry: defaultGeometry,
  name: '',
  vicinity: '',
  placeID: '',
}

export const EventModel = types.model('Event', {
  _id: types.string,
  name: types.string,
  description: types.string,
  startTime: types.string,
  endTime: types.string,
  location: types.optional(LocationModel, defaultLocation),
})

export const defaultEvent: Event = {
  _id: '',
  name: '',
  description: '',
  startTime: '',
  endTime: '',
  location: defaultLocation,
}

const EventAssigneeModel = types.model('EventAssigneeModel', {
  _id: types.string,
  email: types.string,
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  organizationID: types.string,
  phoneNumber: types.optional(types.string, ''),
  profilePhoto: types.maybeNull(types.string),
  title: types.optional(types.string, ''),
  roles: types.array(types.string),
})

export const EventDetailsModel = types.model('EventDetails', {
  _id: types.string,
  name: types.string,
  description: types.string,
  startTime: types.string,
  endTime: types.string,
  location: types.optional(LocationModel, defaultLocation),
  eventAssignees: types.array(EventAssigneeModel),
})

export const defaultEventDetails: EventDetails = {
  _id: '',
  name: '',
  description: '',
  startTime: '',
  endTime: '',
  location: defaultLocation,
  eventAssignees: [],
}

export const EventStoreModel = types
  .model('EventStore', {
    getEventsLoading: false,
    getEventByIdLoading: false,
    selectedEvent: types.optional(EventModel, defaultEvent),
    eventDetails: types.optional(EventDetailsModel, defaultEventDetails),
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
    getEventById: flow(function* getEventById(
      showID: string,
      scheduleID: string,
      eventID: string
    ) {
      self.getEventByIdLoading = true
      const response: GetEventByIdResponse = yield self.api.eventApi.getEventById(
        {
          organizationID: self.organizationID,
          showID,
          scheduleID,
          eventID,
        }
      )
      self.getEventByIdLoading = false

      if (response.kind === 'ok') {
        self.eventDetails = response.data
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    setSelectedEvent(event: Event) {
      self.selectedEvent = clone(event)
    },
  }))

export type EventStore = Instance<typeof EventStoreModel>
