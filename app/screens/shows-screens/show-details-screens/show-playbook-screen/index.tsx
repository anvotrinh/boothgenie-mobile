import * as React from 'react'
import { RefreshControl, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../models/root-store'
import { color } from '../../../../theme'
import { SectionList } from './section-list'
import { Section } from '../../../../services/api'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export type ShowPlaybookScreenProps = NavigationScreenProps<{}>

export const ShowPlaybookScreen: React.FunctionComponent<ShowPlaybookScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      sectionStore: { getSections, sectionsData, sectionsLoading },
      showStore: { showDetails },
    } = useStores()

    React.useEffect(() => {
      getSections(showDetails._id)
    }, [])

    const onItemPress = (item: Section) => {
      navigateTo({
        routeName: 'showSectionDetails',
        params: {
          section: item,
        },
      })
    }

    return (
      <View style={styles.screen} testID="ShowPlaybookScreen">
        <SectionList
          onItemPress={onItemPress}
          sectionsData={sectionsData}
          isLoading={sectionsLoading}
          refreshControl={
            <RefreshControl
              refreshing={sectionsLoading}
              onRefresh={() => getSections(showDetails._id)}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
