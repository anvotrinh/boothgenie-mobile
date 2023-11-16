import * as React from 'react'
import { StyleSheet, View, ViewStyle, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../models/root-store'
import { color } from '../../../../theme'
import { MemberList } from './member-list'
import { UserProfile } from '../../../../services/api'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export interface Member extends UserProfile {
  role: string
}

export type ShowTeamScreenProps = NavigationScreenProps<{}>

export const ShowTeamScreen: React.FunctionComponent<ShowTeamScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      showStore: { getShowById, showDetails, getShowByIdLoading },
    } = useStores()

    const onItemPress = (item: UserProfile) => {
      navigateTo({
        routeName: 'showMemberDetails',
        params: {
          member: item,
        },
      })
    }

    const staffs = showDetails.showStaffers.map((member: UserProfile) => ({
      ...member,
      role: 'Staffer',
    }))

    const managers = showDetails.managedBy.map((member: UserProfile) => ({
      ...member,
      role: 'Event Manager',
    }))

    const members: Member[] = [...staffs, ...managers]

    return (
      <View style={styles.screen} testID="ShowTeamScreen">
        <MemberList
          onItemPress={onItemPress}
          members={members}
          isLoading={getShowByIdLoading}
          refreshControl={
            <RefreshControl
              refreshing={getShowByIdLoading}
              onRefresh={() => getShowById(showDetails._id)}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
