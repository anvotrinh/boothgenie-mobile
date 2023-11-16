import { getEnv, getParent, Instance, types, flow } from 'mobx-state-tree'
import { Api } from '../../services/api'
import Chatkit from '@pusher/chatkit-client/react-native'
import { RootStore } from '../root-store'
import { REACT_APP_PUSHER_INSTANCE_LOCATOR, API_URL } from 'react-native-dotenv'
import {
  ChatRoom,
  SendChatMessageResponse,
} from '../../services/api/chat/chat.types'
import dayjs from 'dayjs'

export enum UserPresence {
  Online = 'online',
  Offline = 'offline',
  Unknown = 'unknown',
}

export const ChatMessageModel = types.model('ChatMessageModel', {
  id: types.string,
  parts: types.frozen(),
})

export const ChatRoomModel = types.model('ChatRoomModel', {
  id: types.string,
  messages: types.array(ChatMessageModel),
  unreadCount: types.string,
})

export const CurrentChatUserModel = types
  .model('CurrentChatUserModel', {
    id: types.string,
    rooms: types.array(ChatRoomModel),
  })
  .actions(() => ({
    // eslint-disable-next-line
    subscribeToRoomMultipart: (params: any) => Promise,
    // eslint-disable-next-line
    fetchMultipartMessages: (params: any) => Promise,
    // eslint-disable-next-line
    setReadCursor: (params: any) => Promise,
    disconnect: () => Promise,
  }))

const defaultChatUser = {
  id: '',
  rooms: [],
}

export const ChatStoreModel = types
  .model('ChatStoreModel', {
    isChatLoading: false,
  })
  .volatile(() => ({
    currentUser: types.optional(CurrentChatUserModel, defaultChatUser).create(),
    roomList: types.array(ChatRoomModel).create(),
  }))
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get userID() {
      return getParent<RootStore>(self).userStore.userProfile._id
    },
    get accessToken() {
      return getParent<RootStore>(self).authStore.accessToken
    },
    get currentChatUserId() {
      return self.currentUser.id
    },
    get organizationID() {
      return getParent<RootStore>(self).userStore.userProfile.organizationID
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
    getChatRoomWithId(roomId: string) {
      return (self as any).roomList?.find(room => room.id === roomId) || null
    },
  }))

  .actions(self => ({
    subscribeToRoom(room) {
      return self.currentUser.subscribeToRoomMultipart({
        roomId: room.id,
        hooks: {
          onMessage: (self as any).updateMessage,
        },
        messageLimit: 0,
      })
    },

    getMessageFromRoom(room) {
      return self.currentUser.fetchMultipartMessages({
        roomId: room.id,
        direction: 'older',
        limit: 100,
      })
    },

    updateRoomList(rooms: ChatRoom[]) {
      if (!rooms) return
      self.roomList = [
        ...rooms.sort(
          (a, b) =>
            dayjs(a.lastMessageAt).millisecond() -
            dayjs(b.lastMessageAt).millisecond()
        ),
      ]
    },

    addNewChatRoom: flow(function*(room) {
      const messages = yield self.getMessageFromRoom(room)
      yield self.subscribeToRoom(room)
      self.roomList.unshift({ ...room, messages })
    }),

    afterCreate: flow(function*() {
      if (!self.currentUser.id) {
        yield (self as any).initChatUser()
      }
    }),

    initChatUser: flow(function*() {
      const tokenProvider = new Chatkit.TokenProvider({
        url: `${API_URL}auth/chatkit`,
        headers: {
          Authorization: `Bearer ${self.accessToken}`,
        },
      })

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: `${REACT_APP_PUSHER_INSTANCE_LOCATOR}`,
        userId: self.userID,
        tokenProvider,
      })

      self.isChatLoading = true

      self.currentUser = yield chatManager.connect({
        onAddedToRoom: self.addNewChatRoom,
        onNewReadCursor: self.updateReadCursor,
      })

      const rooms = [...self.currentUser.rooms]

      self.updateRoomList(rooms)

      const roomMessages = yield Promise.all(
        self.roomList.map(room =>
          self.currentUser.fetchMultipartMessages({
            roomId: room.id,
            direction: 'older',
            limit: 100,
          })
        )
      )

      yield Promise.all(
        self.roomList.map(room =>
          self.currentUser.subscribeToRoomMultipart({
            roomId: room.id,
            hooks: {
              onMessage: (self as any).updateMessage,
            },
            messageLimit: 0,
          })
        )
      )

      self.roomList = self.roomList.map((room, idx) => ({
        ...room,
        messages: [...roomMessages[idx]],
      }))

      self.isChatLoading = false
    }),

    disconnect: flow(function*() {
      self.currentUser?.disconnect()
    }),

    updateReadCursor: cursor => {
      const currentRoom = self.roomList.find(room => room.id === cursor.room.id)
      if (cursor.room.unreadCount !== currentRoom?.unreadCount) {
        self.roomList = self.roomList.map(room =>
          room.id === cursor.room.id
            ? { ...room, unreadCount: cursor.room.unreadCount }
            : room
        )
      }
    },

    updateMessage: message => {
      const roomIdx = self.roomList.findIndex(
        room => room.id === message.roomId
      )
      self.roomList.unshift({
        ...message.room,
        messages: [...self.roomList[roomIdx].messages, message],
      })
      self.roomList.splice(roomIdx + 1, 1)
      self.roomList = [...self.roomList]
    },

    sendMessage: flow(function*(text: string, roomId: string) {
      const response: SendChatMessageResponse = yield self.api.chatApi.sendMessage(
        {
          organizationID: self.organizationID,
          roomId,
          text,
        }
      )

      if (response.kind !== 'ok') {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),

    setReadCursor: flow(function*(roomId: string, position: number) {
      if (!roomId && !position) return
      yield self.currentUser.setReadCursor({
        roomId,
        position,
      })
    }),
  }))

export type ChatStore = Instance<typeof ChatStoreModel>
