import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  List,
  ListProps,
  Text,
  ListItem,
  Empty,
  Avatar,
} from '../../../../components'
import { color, typography, spacing } from '../../../../theme'
import { getFullName } from '../../../../utils/user'
import { Member } from '.'
const defaultAvatar = require('../../../../assets/images/avatar/default-avatar.png')

interface Styles {
  list: ViewStyle
  emptyContainerStyle: ViewStyle
  listItem: ViewStyle
  contentContainer: ViewStyle
  itemContent: ViewStyle
  itemNameWrapper: ViewStyle
  itemName: TextStyle
  itemEmail: TextStyle
  itemRole: TextStyle
}

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: spacing[4],
  },
  itemEmail: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.medium,
  },
  itemName: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },
  itemNameWrapper: {},
  itemRole: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  list: {
    backgroundColor: color.palette.backgroundGrey,
    marginTop: spacing[2],
  },
  listItem: {
    backgroundColor: color.palette.white,
    borderBottomWidth: 1,
    borderColor: color.palette.iceBlue,
  },
})

interface ListItemProps {
  item: Member
  index?: number
}

interface MemberListProps extends ListProps {
  onItemPress?: (item: Member) => void
  members: Member[]
  isLoading: boolean
}

export const MemberList = observer(
  ({ onItemPress, members, isLoading, ...rest }: MemberListProps) => {
    const renderItem = ({ item }: ListItemProps) => {
      const onPress = () => {
        if (onItemPress) {
          onItemPress(item)
        }
      }

      return (
        <ListItem key={item._id} style={styles.listItem} onPress={onPress}>
          <View style={styles.contentContainer}>
            <Avatar
              source={
                item.profilePhoto ? { uri: item.profilePhoto } : defaultAvatar
              }
            />
            <View style={styles.itemContent}>
              <View style={styles.itemNameWrapper}>
                <Text style={styles.itemName}>
                  {getFullName(item.firstName, item.lastName)}
                </Text>
                <Text style={styles.itemEmail}>{item.email}</Text>
              </View>
              <Text style={styles.itemRole}>{item.role}</Text>
            </View>
          </View>
        </ListItem>
      )
    }

    return (
      <List
        style={styles.list}
        data={members}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? null : (
            <Empty
              description="No members found."
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
        {...rest}
      />
    )
  }
)
