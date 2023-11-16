import * as React from 'react'
import {
  StyleSheet,
  TextStyle,
  View,
  ImageStyle,
  ViewStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text, Avatar } from '../../../components'
import { navigationStyles } from '../../navigation-styles'
import { color, spacing } from '../../../theme'
import { useStores } from '../../../models/root-store'
const defaultAvatar = require('../../../assets/images/avatar/default-avatar.png')

interface Styles {
  title: TextStyle
  avatar: ImageStyle
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  avatar: {
    height: 28,
    width: 28,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: color.palette.white,
    margin: spacing[2],
  },
})

interface ChatRoomNameProps {
  navigation: any
}

export const ChatRoomName = observer(({ navigation }: ChatRoomNameProps) => {
  const roomId = navigation.getParam('roomId')
  const {
    chatStore: { getChatRoomWithId, currentChatUserId },
  } = useStores()

  const room = getChatRoomWithId(roomId)
  const roomAvatar = () => {
    if (!room || room?.userIds?.length > 2) {
      return null
    }
    const userId = room.userIds.find(user => user !== currentChatUserId)

    return room.userStore?.users[userId]?.avatarURL || defaultAvatar
  }

  return (
    <View style={styles.container}>
      {roomAvatar() && <Avatar source={roomAvatar()} style={styles.avatar} />}
      <Text
        style={{
          ...navigationStyles.headerTitleChildStyle,
          ...styles.title,
        }}
      >
        {room?.name || ''}
      </Text>
    </View>
  )
})
