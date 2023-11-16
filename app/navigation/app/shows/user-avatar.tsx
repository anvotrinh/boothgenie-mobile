import * as React from 'react'
import { TouchableOpacity, StyleSheet, ImageStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../models/root-store'
import { Avatar } from '../../../components'
const defaultAvatar = require('../../../assets/images/avatar/default-avatar.png')

interface Styles {
  avatar: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  avatar: {
    height: 30,
    marginLeft: 14,
    width: 30,
  },
})

export const UserAvatar = observer(() => {
  const {
    navigationStore: { navigateTo },
    userStore: {
      userProfile: { profilePhoto },
    },
  } = useStores()

  const onPress = () => {
    navigateTo({ routeName: 'settings' })
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar
        source={profilePhoto ? { uri: profilePhoto } : defaultAvatar}
        style={styles.avatar}
      />
    </TouchableOpacity>
  )
})
