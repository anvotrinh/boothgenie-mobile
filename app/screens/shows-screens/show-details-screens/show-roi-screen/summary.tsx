import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { FontIcon, Text } from '../../../../components'
import { ROI } from '../../../../services/api'
import { color, spacing, typography } from '../../../../theme'
import { startCase } from '../../../../utils/string'
import { formatter } from '../../../../utils/number'
import { ROIMetadata } from '../../../../utils/roi'

interface Styles {
  summaryNumber: TextStyle
  summarySection: ViewStyle
  summaryLabel: TextStyle
}

const styles = StyleSheet.create<Styles>({
  summaryLabel: {
    color: color.palette.white,
    fontSize: typography.fontSize.small,
  },
  summaryNumber: {
    color: color.palette.white,
    fontSize: spacing[5],
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 30,
  },
  summarySection: {
    alignItems: 'center',
    backgroundColor: color.palette.darkSkyBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
})

interface Props {
  onPress?: () => void
  section?: string
  roiID?: ROI
  showArrow?: boolean
  tactic?: string
}

export const Summary = observer(
  ({ onPress, roiID, section, showArrow = false, tactic }: Props) => {
    let content: React.ReactNode

    if (roiID && section && tactic) {
      content = (
        <View style={styles.summarySection}>
          <View>
            <Text style={styles.summaryLabel}>
              {ROIMetadata[section][tactic].description || startCase(tactic)}
            </Text>
            <Text style={styles.summaryNumber}>
              {formatter(roiID[section][tactic] || 0, {
                preset: ROIMetadata[section][tactic].valueType,
              })}
            </Text>
          </View>
          {showArrow && (
            <FontIcon
              pack="ant"
              name="arrowright"
              size={24}
              color={color.palette.white}
            />
          )}
        </View>
      )
    } else {
      content = (
        <View style={styles.summarySection}>
          <View>
            <Text> </Text>
          </View>
          <FontIcon
            pack="ant"
            name="arrowright"
            size={24}
            color={color.palette.white}
          />
        </View>
      )
    }

    if (onPress) {
      return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
    }

    return content
  }
)
