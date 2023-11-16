import * as React from 'react'
import { RefreshControl, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../models/root-store'
import { color, spacing } from '../../../theme'
import { ShowList } from './show-list'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
    padding: spacing[4],
  },
})

export type ShowsUpcomingScreenProps = NavigationScreenProp<{}>

export const ShowsUpcomingScreen: React.FunctionComponent<ShowsUpcomingScreenProps> = observer(
  () => {
    const {
      showStore: { getUpcomingShows, upcomingShowsData, upcomingShowsLoading },
    } = useStores()

    React.useEffect(() => {
      getUpcomingShows()
    }, [])

    return (
      <View testID="ShowsUpcomingScreen" style={styles.screen}>
        <ShowList
          showsData={upcomingShowsData}
          showsLoading={upcomingShowsLoading}
          refreshControl={
            <RefreshControl
              refreshing={upcomingShowsLoading}
              onRefresh={getUpcomingShows}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
