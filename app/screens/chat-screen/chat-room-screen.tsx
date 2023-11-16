import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models/root-store'
import { Spinner, Text, AvatarList } from '../../components'
import { color, typography, spacing } from '../../theme'
import { ChatView } from '../../components'
import head from 'lodash/head'
import get from 'lodash/get'
const defaultAvatar = require('../../assets/images/avatar/default-avatar.png')

interface Styles {
  screen: ViewStyle
  avatarListContainer: ViewStyle
  facePileName: TextStyle
}

const styles = StyleSheet.create<Styles>({
  avatarListContainer: {
    alignItems: 'center',
    backgroundColor: color.palette.whiteFour,
    paddingVertical: spacing[3],
  },
  facePileName: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    textAlign: 'center',
  },
  screen: {
    backgroundColor: color.palette.white,
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export type ChatRoomScreenProps = NavigationScreenProp<{}>

export const ChatRoomScreen: React.FunctionComponent<ChatRoomScreenProps> = observer(
  ({ navigation }) => {
    const {
      chatStore: {
        isChatLoading,
        currentUser,
        sendMessage,
        getChatRoomWithId,
        setReadCursor,
      },
    } = useStores()
    const roomId = navigation.getParam('roomId')
    const currentRoom = getChatRoomWithId(roomId)
    const numFacesToRender = 3

    const conversationMessages = currentRoom?.messages
      ?.map(i => ({
        _id: i.id,
        text: i.parts[0].payload.content,
        createdAt: i.createdAt,
        user: {
          _id: i.sender.id,
          name: i.sender.name,
          avatar: i.sender.avatarURL || defaultAvatar,
        },
      }))
      .slice(0)
      .reverse()

    const lastestMessageId = get(head(conversationMessages), '_id', null)

    if (!!roomId && lastestMessageId) {
      setReadCursor(roomId, lastestMessageId)
    }

    const user = { _id: currentUser?.id, name: currentUser?.name }

    const onSend = message => {
      sendMessage(message[0].text, roomId)
    }

    const currentRoomUsers =
      currentRoom?.userIds.map(id => currentRoom.userStore.users[id]) || []

    const memberDetailName = () => {
      if (currentRoomUsers?.length > numFacesToRender) {
        return `${currentRoomUsers
          .slice(0, numFacesToRender)
          .map(user => user.name)
          .join(', ')} and ${currentRoomUsers?.length -
          numFacesToRender} others`
      } else {
        return currentRoomUsers?.map(user => user.name).join(', ')
      }
    }

    const currentRoomUserAvatars = currentRoomUsers.map(user => ({
      _id: user.id,
      profilePhoto: user.imageURL,
    }))

    return (
      <View testID="ChatRoomScreen" style={styles.screen}>
        {isChatLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <View style={styles.avatarListContainer}>
              <AvatarList
                sources={currentRoomUserAvatars}
                maxAvatarNumber={numFacesToRender}
              />
              <Text style={styles.facePileName}>{memberDetailName()}</Text>
            </View>
            <ChatView
              messages={conversationMessages}
              user={user}
              onSend={messages => onSend(messages)}
            />
          </React.Fragment>
        )}
      </View>
    )
  }
)
