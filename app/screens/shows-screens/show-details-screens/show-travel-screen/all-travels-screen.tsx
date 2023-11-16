import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import {
  Empty,
  Spinner,
  Text,
  List,
  ListItem,
  FontIcon,
  Avatar,
} from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { Travel, UserProfile } from '../../../../services/api'
import { useStores } from '../../../../models/root-store'
import { getFullName } from '../../../../utils/user'
const defaultAvatar = require('../../../../assets/images/avatar/default-avatar.png')

interface Styles {
  emptyContainerStyle: ViewStyle
  listItemStyle: ViewStyle
  horizontalItemContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  horizontalItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  listItemStyle: {
    borderBottomColor: color.palette.iceBlue,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
})

export type ShowAllTravelsScreenProps = NavigationScreenProp<{}>
export type TravelItemProps = {
  item: Travel
  onItemPress?: () => void
  user: UserProfile
  currenUserId?: string
}
export const TravelItem = observer(
  ({ item, onItemPress, user, currenUserId }: TravelItemProps) => {
    const onPress = () => {
      if (onItemPress) {
        onItemPress()
      }
    }

    return (
      <ListItem style={styles.listItemStyle} key={item._id} onPress={onPress}>
        <View style={styles.horizontalItemContainer}>
          <Avatar
            key={item._id}
            source={user?.profilePhoto || defaultAvatar}
            style={{ marginRight: spacing[4] }}
          />
          <Text
            style={{
              fontSize: typography.fontSize.small,
              fontWeight: typography.fontWeight.bold,
              color: color.palette.darkIndigo,
            }}
          >
            {`${getFullName(user?.firstName || '', user?.lastName || '')}${
              user?._id === currenUserId ? ' (me)' : ''
            }`}
          </Text>
        </View>
        <View style={styles.horizontalItemContainer}>
          <FontIcon
            pack="ion"
            style={{ marginRight: spacing[5] }}
            color={
              item.flightIDs?.length > 0
                ? color.palette.darkSkyBlue
                : color.palette.frenchGrey
            }
            name="md-airplane"
            size={23}
          />
          <FontIcon
            name="bed"
            style={{ marginRight: spacing[4] }}
            color={
              item.lodgingIDs.length > 0
                ? color.palette.darkSkyBlue
                : color.palette.frenchGrey
            }
            size={23}
          />
          {!!onItemPress && (
            <FontIcon
              pack="ant"
              name="right"
              size={20}
              color={color.palette.frenchGrey}
            />
          )}
        </View>
      </ListItem>
    )
  }
)

export const ShowAllTravelsScreen: React.FunctionComponent<ShowAllTravelsScreenProps> = observer(
  () => {
    const {
      showStore: { showDetails },
      travelStore: { getAllTravels, getAllTravelsLoading, allTravels },
      navigationStore: { navigateTo },
      userStore: { userProfile },
    } = useStores()

    React.useEffect(() => {
      if (showDetails._id) {
        getAllTravels(showDetails._id)
      }
    }, [])

    if (getAllTravelsLoading) return <Spinner />

    const users = [...showDetails.showStaffers, ...showDetails.managedBy]

    const onItemPress = item => () => {
      navigateTo({
        routeName: 'showDetails:travels:allTravels:detail',
        params: {
          travelDetail: item,
        },
      })
    }

    const renderItem = ({ item }) => {
      return (
        <TravelItem
          currenUserId={userProfile._id}
          item={item}
          onItemPress={onItemPress(item)}
          user={users.find(user => user._id === item.userID)}
        />
      )
    }

    if (allTravels.list.length === 0) {
      return (
        <Empty
          description="No travels found."
          containerStyle={styles.emptyContainerStyle}
        />
      )
    }

    return (
      <View>
        <List
          style={{ marginVertical: spacing[3] }}
          data={allTravels.list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            getAllTravelsLoading ? null : (
              <Empty
                description="No travels found."
                containerStyle={styles.emptyContainerStyle}
              />
            )
          }
        />
      </View>
    )
  }
)
