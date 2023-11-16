import { flow, getEnv, getParent, Instance, types } from 'mobx-state-tree'
import {
  Api,
  GetTrainingsResponse,
  CompleteLessonResponse,
  CreateTrainingResultResponse,
} from '../../services/api'
import { RootStore } from '../root-store'
import { clone } from '../../utils/object'
import { GetTrainingResultsByUserResponse } from '../../services/api/training-result/training-result.types'

const ProviderModel = types.model('Provider', {
  youtube: types.optional(types.string, ''),
})

const defaultProvider = {
  _id: '',
}

const DocumentModel = types.model('Document', {
  _id: types.string,
  provider: types.optional(ProviderModel, defaultProvider),
})

const QuestionModel = types.model('Question', {
  title: types.string,
  options: types.array(types.string),
  answer: types.array(types.number),
  type: types.string,
})

const LessonModel = types.model('Lesson', {
  _id: types.string,
  name: types.string,
  content: types.string,
  documents: types.array(DocumentModel),
})

const UserModel = types.model('User', {
  _id: types.string,
})

const defaultUser = {
  _id: '',
}

const TrainingUserModel = types
  .model('TrainingUser', {
    _id: types.string,
    completedLessons: types.array(types.string),
    userID: types.optional(UserModel, defaultUser),
  })
  .actions(self => ({
    completeLesson(lessonID: string) {
      if (!self.completedLessons.includes(lessonID)) {
        self.completedLessons.push(lessonID)
      }
    },
  }))

const ShowModel = types.model('Show', {
  _id: types.string,
  showName: types.string,
})

const defaultShow = {
  _id: '',
  showName: '',
}

const TrainingModel = types
  .model('Training', {
    _id: types.string,
    status: types.optional(types.string, ''),
    name: types.string,
    showID: types.optional(ShowModel, defaultShow),
    lessons: types.array(LessonModel),
    questionIDs: types.array(QuestionModel),
    users: types.array(TrainingUserModel),
  })
  .actions(self => ({
    completeUserLesson(userID: string, lessonID: string) {
      const userIndex = self.users.findIndex(user => user.userID._id === userID)
      if (userIndex !== -1) {
        self.users[userIndex].completeLesson(lessonID)
      }
    },
  }))

const defaultTraining = {
  _id: '',
  name: '',
  showID: defaultShow,
  lessons: [],
}

const TrainingDataModel = types.model('TrainingData', {
  totalCount: types.number,
  list: types.array(TrainingModel),
})

const defaultTrainingData = {
  totalCount: 0,
  list: [],
}

export const TrainingStoreModel = types
  .model('TrainingStore', {
    getTrainingsLoading: false,
    trainingsData: types.optional(TrainingDataModel, defaultTrainingData),
    trainingDetails: types.optional(TrainingModel, defaultTraining),
    completeTrainingLoading: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return getParent<RootStore>(self).userStore.userProfile.organizationID
    },
    get userID() {
      return getParent<RootStore>(self).userStore.userProfile._id
    },
    get navigationStore() {
      return getParent<RootStore>(self).navigationStore
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getTrainings: flow(function* getTrainings() {
      self.getTrainingsLoading = true
      const response: GetTrainingsResponse = yield self.api.trainingApi.getTrainings(
        {
          organizationID: self.organizationID,
        }
      )
      self.getTrainingsLoading = false

      if (response.kind === 'ok') {
        const userTraining = response.data.list.filter(
          training =>
            !!training.users.find(user => user.userID._id === self.userID)
        )
        self.trainingsData = {
          totalCount: response.data.totalCount,
          list: userTraining,
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
      // TODO: FIX ME WHEN SERVER HAS ENDPOINT TO GET ALL STATUS
      const showIDs: string[] = []
      for (const training of self.trainingsData.list) {
        if (!showIDs.includes(training.showID._id)) {
          showIDs.push(training.showID._id)
        }
      }
      for (const showID of showIDs) {
        const response: GetTrainingResultsByUserResponse = yield self.api.trainingResultApi.getTrainingResultsByUser(
          {
            organizationID: self.organizationID,
            showID,
            userID: self.userID,
          }
        )
        if (response.kind === 'ok') {
          for (const trainingResult of response.data.list) {
            if (!trainingResult.trainingTaskID) {
              continue
            }
            const training = self.trainingsData.list.find(
              training => training._id === trainingResult.trainingTaskID._id
            )
            if (!training) {
              continue
            }
            training.status = trainingResult.status
          }
        } else {
          self.showMessage({
            type: 'danger',
            message: 'Error',
            description: response.message,
          })
        }
      }
    }),

    completeTrainingLesson: flow(function* completeTrainingLesson(
      lessonID: string
    ) {
      if (!self.trainingDetails._id) {
        return
      }
      const response: CompleteLessonResponse = yield self.api.trainingApi.completeLesson(
        {
          organizationID: self.organizationID,
          trainingID: self.trainingDetails._id,
          lessonID,
          userID: self.userID,
        }
      )

      if (response.kind === 'ok') {
        self.trainingDetails.completeUserLesson(self.userID, lessonID)
        const trainingIndex = self.trainingsData.list.findIndex(
          training => training._id === self.trainingDetails._id
        )
        if (trainingIndex !== -1) {
          self.trainingsData.list[trainingIndex].completeUserLesson(
            self.userID,
            lessonID
          )
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    completeTraining: flow(function* completeTraining() {
      self.completeTrainingLoading = true
      const response: CreateTrainingResultResponse = yield self.api.trainingResultApi.createTrainingResult(
        {
          organizationID: self.organizationID,
          trainingID: self.trainingDetails._id,
          showID: self.trainingDetails.showID._id,
        }
      )
      self.completeTrainingLoading = false

      if (response.kind === 'ok') {
        self.trainingDetails.status = 'COMPLETED'
        const trainingIndex = self.trainingsData.list.findIndex(
          training => training._id === self.trainingDetails._id
        )
        if (trainingIndex !== -1) {
          self.trainingsData.list[trainingIndex].status = 'COMPLETED'
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    setTrainingDetails(training) {
      self.trainingDetails = clone(training)
    },
  }))

export type Training = Instance<typeof TrainingModel>
export type TrainingStore = Instance<typeof TrainingStoreModel>
