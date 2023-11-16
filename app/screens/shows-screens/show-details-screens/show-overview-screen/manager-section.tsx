import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Show } from '../../../../services/api'
import { Avatar, Icon, Text } from '../../../../components'
import { color, spacing } from '../../../../theme'
import { getFullName } from '../../../../utils/user'
const defaultAvatar = require('../../../../assets/images/avatar/default-avatar.png')

interface Styles {
  content: ViewStyle
  h3: ViewStyle
  listItem: ViewStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: spacing[3],
  },
  h3: {
    marginBottom: spacing[4],
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  title: {
    color: color.palette.darkIndigo,
    lineHeight: spacing[5],
  },
})

interface Props {
  showDetails: Show
}

export const ManagerSection = observer(({ showDetails }: Props) => {
  const { managedBy } = showDetails

  return (
    <View>
      <Text style={styles.h3} category="h3">
        Event Manager
      </Text>
      {managedBy.length > 0 ? (
        managedBy.map(user => (
          <View style={styles.listItem} key={user._id}>
            <Avatar
              source={
                user.profilePhoto ? { uri: user.profilePhoto } : defaultAvatar
              }
            />
            <View style={styles.content}>
              <Text style={styles.title}>
                {getFullName(user.firstName, user.lastName)}
              </Text>
              <Icon icon="commentInactive" />
            </View>
          </View>
        ))
      ) : (
        <Text>No event managers.</Text>
      )}
    </View>
  )
})
