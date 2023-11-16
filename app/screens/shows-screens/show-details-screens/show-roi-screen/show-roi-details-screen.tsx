import * as React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { startCase } from '../../../../utils/string'
import { formatter } from '../../../../utils/number'
import { ROIMetadata } from '../../../../utils/roi'
import { Summary } from './summary'

interface Styles {
  calcLabel: ViewStyle
  calcNumber: ViewStyle
  calcRow: ViewStyle
  heading: ViewStyle
  screen: ViewStyle
  section: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  calcLabel: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.tiny,
    lineHeight: spacing[4],
  },
  calcNumber: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 30,
  },
  calcRow: {
    marginBottom: spacing[2],
  },
  heading: {
    lineHeight: 30,
    marginBottom: spacing[4],
  },
  screen: {
    flex: 1,
  },
  section: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    padding: spacing[4],
  },
})

export type ShowROIDetailsScreenProps = NavigationScreenProp<{}>

export const ShowROIDetailsScreen: React.FunctionComponent<ShowROIDetailsScreenProps> = observer(
  ({ navigation }) => {
    const roiID = navigation.getParam('roiID')
    const section = navigation.getParam('section')
    const tactics = navigation.getParam('tactics')
    const summaryTactics = navigation.getParam('summaryTactics')

    return (
      <ScrollView
        testID="ShowROIDetailsScreen"
        style={styles.screen}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text category="h3" style={styles.heading}>
            Calculations
          </Text>
          {tactics.map(tactic => (
            <View key={tactic} style={styles.calcRow}>
              <Text style={styles.calcLabel}>
                {ROIMetadata[section][tactic].description || startCase(tactic)}
              </Text>
              <Text style={styles.calcNumber}>
                {formatter(roiID[section][tactic] || 0, {
                  preset: ROIMetadata[section][tactic].valueType,
                })}
              </Text>
            </View>
          ))}
        </View>
        {summaryTactics.map(tactic => (
          <Summary
            key={tactic}
            roiID={roiID}
            tactic={tactic}
            section={section}
          />
        ))}
      </ScrollView>
    )
  }
)
