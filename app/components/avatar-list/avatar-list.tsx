import * as React from 'react'
import { ImageStyle, StyleSheet, View, ViewStyle } from 'react-native'
import { color } from '../../theme'
import { Avatar } from '../avatar/avatar'
import { AvatarMore } from './avatar-more'
const defaultAvatar = require('../../assets/images/avatar/default-avatar.png')

const DEFAULT_AVATAR_SIZE = 28
const MAX_AVATAR_NUMBER = 3

interface Styles {
  list: ViewStyle
  avatar: ImageStyle
}

interface Source {
  _id: string
  profilePhoto?: string
}

interface Props {
  avatarSize?: number
  avatarStyle?: ImageStyle
  listStyle?: ViewStyle
  maxAvatarNumber?: number
  sources: Source[]
}

export const AvatarList = ({
  avatarSize = DEFAULT_AVATAR_SIZE,
  avatarStyle: avatarStyleOverride,
  listStyle: listStyleOverride,
  maxAvatarNumber = MAX_AVATAR_NUMBER,
  sources,
}: Props) => {
  const halfSize = Math.floor(avatarSize / 2)
  const styles = StyleSheet.create<Styles>({
    avatar: {
      borderColor: color.palette.white,
      borderWidth: 1,
      height: avatarSize,
      marginLeft: -halfSize,
      width: avatarSize,
    },
    list: {
      flexDirection: 'row',
      marginLeft: halfSize,
    },
  })
  const listStyle = listStyleOverride
    ? { ...styles.list, ...listStyleOverride }
    : styles.list

  const avatarStyle = avatarStyleOverride
    ? { ...styles.avatar, ...avatarStyleOverride }
    : styles.avatar

  const visibleSources = sources.slice(0, maxAvatarNumber)

  return (
    <View style={listStyle}>
      {visibleSources.map(source => {
        return (
          <Avatar
            style={avatarStyle}
            key={source._id}
            source={
              source.profilePhoto ? { uri: source.profilePhoto } : defaultAvatar
            }
          />
        )
      })}
      {sources.length > maxAvatarNumber && (
        <AvatarMore size={avatarSize} more={sources.length - maxAvatarNumber} />
      )}
    </View>
  )
}
