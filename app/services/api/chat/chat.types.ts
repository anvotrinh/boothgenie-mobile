import Chatkit from '@pusher/chatkit-client'
import { GeneralApiProblem } from '../api-problem'

/**
 * Post Chat Message
 */
export interface SendChatMessageRequest {
  organizationID: string
  text: string
  roomId: string
}

export interface Message {
  message_id: string
}

export type SendChatMessageResponse =
  | { kind: 'ok'; data: Message }
  | GeneralApiProblem

export type ChatMessage = Chatkit.PusherMessage

export interface ChatRoom extends Chatkit.PusherRoom {
  messages: ChatMessage[]
  userIds: string[]
}

export interface CurrentChatUser {
  id: string
  rooms: ChatRoom[]
}
