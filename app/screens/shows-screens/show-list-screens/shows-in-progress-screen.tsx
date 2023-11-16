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

export type ShowsInProgressScreenProps = NavigationScreenProp<{}>

export const ShowsInProgressScreen: React.FunctionComponent<ShowsInProgressScreenProps> = observer(
  () => {
    const {
      showStore: {
        getInProgressShows,
        inProgressShowsData,
        inProgressShowsLoading,
      },
    } = useStores()

    React.useEffect(() => {
      getInProgressShows()
    }, [])

    return (
      <View testID="ShowsInProgressScreen" style={styles.screen}>
        <ShowList
          showsData={inProgressShowsData}
          showsLoading={inProgressShowsLoading}
          refreshControl={
            <RefreshControl
              refreshing={inProgressShowsLoading}
              onRefresh={getInProgressShows}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
