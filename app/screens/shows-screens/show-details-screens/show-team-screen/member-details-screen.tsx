import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color, spacing, typography } from '../../../../theme'
import { Text, Avatar } from '../../../../components'
import { Member } from '.'
import { getFullName } from '../../../../utils/user'
const defaultAvatar = require('../../../../assets/images/avatar/default-avatar.png')

interface Styles {
  screen: ViewStyle
  lineWrapper: ViewStyle
  label: TextStyle
  value: TextStyle
  avatarWrapper: ViewStyle
  nameWrapper: ViewStyle
  name: TextStyle
  email: TextStyle
}

const styles = StyleSheet.create<Styles>({
  avatarWrapper: {
    backgroundColor: color.palette.white,
    flexDirection: 'row',
    padding: spacing[4],
  },
  email: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.regular,
  },
  label: {
    color: color.palette.darkIndigo,
    fontWeight: typography.fontWeight.medium,
  },
  lineWrapper: {
    alignItems: 'center',
    backgroundColor: color.palette.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: spacing[5],
    paddingVertical: 7,
  },
  name: {
    color: color.palette.darkIndigo,
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
  },
  nameWrapper: {
    justifyContent: 'center',
    marginLeft: spacing[3],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  value: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.regular,
  },
})

export type ShowMemberDetailsScreenProps = NavigationScreenProps<{}>

export const ShowMemberDetailsScreen: React.FunctionComponent<ShowMemberDetailsScreenProps> = observer(
  (props: ShowMemberDetailsScreenProps) => {
    const member: Member = props.navigation.getParam('member' as never)

    React.useEffect(() => {
      props.navigation.setParams({ member })
    }, [])

    return (
      <View style={styles.screen} testID="ShowMemberDetailsScreen">
        <View style={styles.avatarWrapper}>
          <Avatar
            source={
              member.profilePhoto ? { uri: member.profilePhoto } : defaultAvatar
            }
            size="giant"
          />
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>
              {getFullName(member.firstName, member.lastName)}
            </Text>
            <Text style={styles.email}>{member.email}</Text>
          </View>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>Accepted</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{member.role}</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Tasks</Text>
          <Text style={styles.value}>49</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Training Complete</Text>
          <Text style={styles.value}>No</Text>
        </View>
      </View>
    )
  }
)
