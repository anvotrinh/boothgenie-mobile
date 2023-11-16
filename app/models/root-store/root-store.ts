import {
  applySnapshot,
  getSnapshot,
  Instance,
  SnapshotOut,
  types,
} from 'mobx-state-tree'
import {
  AuthStoreModel,
  NavigationStoreModel,
  UserStoreModel,
  ShowStoreModel,
  TaskStoreModel,
  SectionStoreModel,
  ScheduleStoreModel,
  EventStoreModel,
  TravelStoreModel,
  AirportStoreModel,
  ButgetCategoryStoreModel,
  ROIStoreModel,
  ChatStoreModel,
  TrainingStoreModel,
} from '../stores'
import { deepReset } from '../../utils/object'

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    authStore: types.optional(AuthStoreModel, {}),
    navigationStore: types.optional(NavigationStoreModel, {}),
    showStore: types.optional(ShowStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    taskStore: types.optional(TaskStoreModel, {}),
    sectionStore: types.optional(SectionStoreModel, {}),
    scheduleStore: types.optional(ScheduleStoreModel, {}),
    eventStore: types.optional(EventStoreModel, {}),
    travelStore: types.optional(TravelStoreModel, {}),
    airportStore: types.optional(AirportStoreModel, {}),
    budgetCategoryStore: types.optional(ButgetCategoryStoreModel, {}),
    roiStore: types.optional(ROIStoreModel, {}),
    chatStore: types.optional(ChatStoreModel, {}),
    trainingStore: types.optional(TrainingStoreModel, {}),
  })
  .actions(self => {
    let initialState
    return {
      afterCreate() {
        try {
          initialState = deepReset(getSnapshot(self))
        } catch (error) {}
      },
      reset() {
        applySnapshot(self, initialState)
      },
    }
  })

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
