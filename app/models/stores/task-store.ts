import {
  flow,
  getEnv,
  getParent,
  Instance,
  types,
  getParentOfType,
} from 'mobx-state-tree'
import {
  Api,
  GetTasksResponse,
  UpdateTaskRequestBody,
} from '../../services/api'
import { RootStore, RootStoreModel } from '../root-store'

const ShowModel = types.model('Show', {
  _id: types.string,
  showName: types.string,
})

const StageModel = types.model('Stage', {
  _id: types.string,
  name: types.string,
})

const TaskAssignedUserModel = types.model('TaskAssignedUser', {
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

const TaskModel = types
  .model('Task', {
    _id: types.string,
    name: types.string,
    dueDate: types.string,
    description: types.string,
    status: types.string,
    showID: ShowModel,
    stageID: StageModel,
    taskAssignedUsers: types.array(TaskAssignedUserModel),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get organizationID() {
      return getParentOfType<RootStore>(self, RootStoreModel).taskStore
        .organizationID
    },
    get updateSameTasks() {
      return getParentOfType<RootStore>(self, RootStoreModel).taskStore
        .updateSameTasks
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    updateTask: flow(function* updateTask(body: UpdateTaskRequestBody) {
      const result: GetTasksResponse = yield self.api.taskApi.updateTask({
        organizationID: self.organizationID,
        showID: self.showID._id,
        taskID: self._id,
        body,
      })

      if (result.kind === 'ok') {
        for (const key in body) {
          self[key] = body[key]
        }
        self.updateSameTasks(self._id, body)
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Update task success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: result.message,
        })
      }
    }),
    updateTaskLocal(body: UpdateTaskRequestBody) {
      for (const key in body) {
        self[key] = body[key]
      }
    },
  }))

const TaskDataModel = types.model('TaskData', {
  totalCount: types.number,
  list: types.array(TaskModel),
})

const defaultTaskData = {
  totalCount: 0,
  list: [],
}

export const TaskStoreModel = types
  .model('TaskStore', {
    myTasksData: types.optional(TaskDataModel, defaultTaskData),
    myTasksLoading: false,
    myTasksShowDetailsData: types.optional(TaskDataModel, defaultTaskData),
    myTasksShowDetailsLoading: false,
    allTasksShowDetailsData: types.optional(TaskDataModel, defaultTaskData),
    allTasksShowDetailsLoading: false,
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
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    getMyTasks: flow(function* getMyTasks() {
      self.myTasksLoading = true
      const result: GetTasksResponse = yield self.api.taskApi.getTasks({
        organizationID: self.organizationID,
        userID: self.userID,
      })
      self.myTasksLoading = false

      if (result.kind === 'ok') {
        self.myTasksData = {
          totalCount: result.data.totalCount,
          list: result.data.list,
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: result.message,
        })
      }
    }),
    getMyTasksShowDetails: flow(function* getMyTasksShowDetails(
      showID: string
    ) {
      self.myTasksShowDetailsLoading = true
      const result: GetTasksResponse = yield self.api.taskApi.getTasksShowDetails(
        {
          organizationID: self.organizationID,
          showID,
          userID: self.userID,
        }
      )
      self.myTasksShowDetailsLoading = false

      if (result.kind === 'ok') {
        self.myTasksShowDetailsData = {
          totalCount: result.data.totalCount,
          list: result.data.list,
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: result.message,
        })
      }
    }),
    getAllTasksShowDetails: flow(function* getAllTasksShowDetails(
      showID: string
    ) {
      self.allTasksShowDetailsLoading = true
      const result: GetTasksResponse = yield self.api.taskApi.getTasksShowDetails(
        {
          organizationID: self.organizationID,
          showID,
        }
      )
      self.allTasksShowDetailsLoading = false

      if (result.kind === 'ok') {
        self.allTasksShowDetailsData = {
          totalCount: result.data.totalCount,
          list: result.data.list,
        }
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: result.message,
        })
      }
    }),
    updateSameTasks: flow(function* updateSameTasks(
      taskID: string,
      taskBody: UpdateTaskRequestBody
    ) {
      self.myTasksData.list.forEach((task: Task) => {
        if (task._id === taskID) {
          task.updateTaskLocal(taskBody)
        }
      })
      self.myTasksShowDetailsData.list.forEach((task: Task) => {
        if (task._id === taskID) {
          task.updateTaskLocal(taskBody)
        }
      })
      self.allTasksShowDetailsData.list.forEach((task: Task) => {
        if (task._id === taskID) {
          task.updateTaskLocal(taskBody)
        }
      })
    }),
  }))

export type Task = Instance<typeof TaskModel>
export type TaskStore = Instance<typeof TaskStoreModel>
