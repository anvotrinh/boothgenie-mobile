import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color } from '../../theme'
import { useStores } from '../../models/root-store'
import { RoomList } from './room-list'
import { Spinner } from '../../components'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    alignItems: 'center',
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
    justifyContent: 'center',
  },
})

export type RoomListScreenProps = NavigationScreenProp<{}>

export const RoomListScreen: React.FunctionComponent<RoomListScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      chatStore: { roomList, isChatLoading, currentUser },
    } = useStores()

    const onItemPress = item => {
      navigateTo({
        routeName: 'chatRoom',
        params: {
          roomId: item.id,
        },
      })
    }

    return (
      <View testID="ChatScreen" style={styles.screen}>
        {isChatLoading ? (
          <Spinner />
        ) : (
          <RoomList
            roomList={roomList}
            isChatLoading={isChatLoading}
            currentUserId={currentUser.id}
            onItemPress={onItemPress}
          />
        )}
      </View>
    )
  }
)
