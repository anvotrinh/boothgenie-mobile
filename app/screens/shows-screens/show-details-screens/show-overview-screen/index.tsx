import * as React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color, spacing } from '../../../../theme'
import { useStores } from '../../../../models/root-store'
import { GoalsAndObjectivesSection } from './goals-and-objectives-section'
import { ManagerSection } from './manager-section'
import { InfoSection } from './info-section'
import { LocationSection } from './location-section'
import { ProgressSection } from './progress-section'
import { Button } from '../../../../components'

interface Styles {
  screen: ViewStyle
  section: ViewStyle
  btnPlayBook: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  btnPlayBook: {
    marginTop: 70,
    paddingHorizontal: spacing[5],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  section: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    padding: spacing[4],
  },
})

export type ShowOverviewScreenProps = NavigationScreenProp<{}>

export const ShowOverviewScreen: React.FunctionComponent<ShowOverviewScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      showStore: { showDetails },
    } = useStores()

    const goToPlayBook = () => navigateTo({ routeName: 'showPlaybook' })

    return (
      <ScrollView
        testID="ShowOverviewScreen"
        style={styles.screen}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ProgressSection showDetails={showDetails} />
        </View>
        <View style={styles.section}>
          <InfoSection showDetails={showDetails} />
        </View>
        <View style={styles.section}>
          <GoalsAndObjectivesSection showDetails={showDetails} />
        </View>
        <View style={styles.section}>
          <LocationSection showDetails={showDetails} />
        </View>
        <View style={styles.section}>
          <ManagerSection showDetails={showDetails} />
        </View>
        <View style={[styles.section, styles.btnPlayBook]}>
          <Button status="primary" size="medium" onPress={goToPlayBook}>
            VIEW PLAYBOOK
          </Button>
        </View>
      </ScrollView>
    )
  }
)
