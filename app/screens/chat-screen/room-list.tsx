import * as React from 'react'
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  List,
  Text,
  ListItem,
  Avatar,
  ListProps,
  Spinner,
  Empty,
} from '../../components'
import { color, typography, spacing } from '../../theme'
import { ChatRoom } from '../../services/api/chat/chat.types'
import last from 'lodash/last'
import { Badge } from '../../components/badge/badge'
import { displayChatDate } from '../../utils/date'
const defaultAvatar = require('../../assets/images/avatar/default-avatar.png')
const groupAvatar = require('../../assets/images/avatar/default-group.png')

interface Styles {
  listContainer: ViewStyle
  list: ViewStyle
  listItem: ViewStyle
  avatarContainer: ViewStyle
  avatar: ImageStyle
  chatRoomInfoContainer: ViewStyle
  roomName: TextStyle
  badgeContainer: ViewStyle
  emptyContainerStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  avatar: {
    height: 50,
    width: 50,
  },
  avatarContainer: {
    marginLeft: spacing[3],
    marginRight: spacing[4],
  },
  badgeContainer: {
    bottom: -4,
    position: 'absolute',
    right: -4,
  },
  chatRoomInfoContainer: {
    flexGrow: 1,
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  list: {
    backgroundColor: color.palette.backgroundGrey,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: color.palette.borderGrey,
    flex: 1,
    paddingVertical: spacing[4],
  },
  roomName: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semiBold,
  },
})

interface RoomItemProps {
  item: ChatRoom
  currentUserId: string
  onItemPress?: (item: ChatRoom) => void
}

interface ListItemProps {
  item: ChatRoom
  index: number
}

interface RoomListProps extends ListProps {
  onItemPress?: (item: ChatRoom) => void
  roomList: any
  currentUserId: string
  isChatLoading: boolean
}

export const RoomItem = observer(
  ({ item, onItemPress, currentUserId }: RoomItemProps) => {
    const lastestMessage = item.messages
      ? last(item.messages)?.parts[0].payload.content
      : ' '

    const roomAvatar = () => {
      if (item?.userIds.length > 2) {
        return groupAvatar
      }
      return (
        item.users?.find(user => user.id !== currentUserId)?.avatarURL ||
        defaultAvatar
      )
    }

    const roomName = () => {
      if (item?.userIds.length > 2) {
        return item.name
      }
      return (
        item.users?.find(user => user.id !== currentUserId)?.name ||
        item?.name ||
        ''
      )
    }

    const onPress = () => {
      if (onItemPress) {
        onItemPress(item)
      }
    }

    return (
      <ListItem key={item.id} style={styles.listItem} onPress={onPress}>
        <View style={styles.avatarContainer}>
          <Avatar source={roomAvatar()} style={styles.avatar} />
          {item.unreadCount > 0 && (
            <Badge
              value={item.unreadCount}
              containerStyle={styles.badgeContainer}
            />
          )}
        </View>
        <View style={styles.chatRoomInfoContainer}>
          <Text style={styles.roomName}>{roomName()}</Text>
          <Text>{lastestMessage}</Text>
        </View>
        <View>
          <Text>{displayChatDate(item.lastMessageAt)}</Text>
        </View>
      </ListItem>
    )
  }
)

export const RoomList = ({
  onItemPress,
  roomList,
  isChatLoading,
  currentUserId,
  ...rest
}: RoomListProps) => {
  const renderItem = ({ item }: ListItemProps) => {
    return (
      <RoomItem
        item={item}
        onItemPress={onItemPress}
        currentUserId={currentUserId}
      />
    )
  }

  return (
    <View style={styles.listContainer}>
      <Spinner />
      <List
        style={styles.list}
        data={roomList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isChatLoading ? null : (
            <Empty
              description="No conversation found."
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
        {...rest}
      />
    </View>
  )
}
