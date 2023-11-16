import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import { Api, GetSectionsResponse } from '../../services/api'
import { RootStore } from '../root-store'

const SectionModel = types.model('Section', {
  _id: types.string,
  name: types.string,
  content: types.string,
  type: types.string,
})

const SectionDataModel = types.model('SectionData', {
  totalCount: types.number,
  list: types.array(SectionModel),
})

const defaultSectionData = {
  totalCount: 0,
  list: [],
}

export const SectionStoreModel = types
  .model('SectionStore', {
    sectionsLoading: false,
    sectionsData: types.optional(SectionDataModel, defaultSectionData),
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
    getSections: flow(function* getSections(showID: string) {
      self.sectionsLoading = true
      const response: GetSectionsResponse = yield self.api.sectionApi.getSections(
        {
          organizationID: self.organizationID,
          showID,
        }
      )
      self.sectionsLoading = false

      if (response.kind === 'ok') {
        self.sectionsData = {
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
  }))

export type SectionStore = Instance<typeof SectionStoreModel>
