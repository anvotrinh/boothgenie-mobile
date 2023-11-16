import * as React from 'react'
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Empty } from '../../../../components'
import { useStores } from '../../../../models/root-store'
import { color, spacing } from '../../../../theme'
import { Form } from './form'

interface Styles {
  emptyContainerStyle: ViewStyle
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export type ShowROIScreenProps = NavigationScreenProp<{}>

export const ShowROIScreen: React.FunctionComponent<ShowROIScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      roiStore: { updateROI },
      showStore: { showDetails },
    } = useStores()

    if (showDetails.roiID.length === 0) {
      return (
        <Empty
          description="No schedules found."
          containerStyle={styles.emptyContainerStyle}
        />
      )
    }

    const roiID = showDetails.roiID[0]

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={styles.screen}
          testID="ShowROIScreen"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Form
            navigateTo={navigateTo}
            roiID={roiID}
            showID={showDetails._id}
            updateROI={updateROI}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
)
