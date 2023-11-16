import * as React from 'react'
import { View } from 'react-native'
import { Avatar, List, ListItem, Text } from '../../../../components'
const defaultAvatar = require('../../../../assets/images/avatar/default-avatar.png')

const data = [
  {
    name: 'Andrew Swyers',
    profilePhoto: defaultAvatar,
  },
]

const renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    icon={() => (
      <Avatar
        source={require('../../../assets/images/avatar/default-avatar.png')}
      />
    )}
  />
)

export const EventManagerSection = () => (
  <View>
    <Text category="h3">Event Manager</Text>
    <List data={data} renderItem={renderItem} />
  </View>
)
