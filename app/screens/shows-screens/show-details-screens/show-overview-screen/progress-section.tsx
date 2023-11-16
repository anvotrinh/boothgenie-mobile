import * as React from 'react'
import {
  Dimensions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Show } from '../../../../services/api'
import { Progress, ProgressCircle, Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { calcProgress, calcDaysRemaining } from '../../../../utils/progress'

const PROGRESS_BAR_WIDTH = Dimensions.get('screen').width - 24 * 2 - 16 - 70

interface Styles {
  barLabelContainer: ViewStyle
  barLabelNumber: TextStyle
  barLabelText: TextStyle
  barProgress: ViewStyle
  barProgressContainer: ViewStyle
  circleProgressContainer: ViewStyle
  circleProgressText: ViewStyle
  progressContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  barLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabelNumber: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },
  barLabelText: {
    fontSize: typography.fontSize.small,
  },
  barProgress: {
    marginBottom: spacing[4],
  },
  barProgressContainer: {
    flex: 1,
  },
  circleProgressContainer: {
    paddingLeft: spacing[2],
    paddingRight: spacing[5],
  },
  circleProgressText: {
    color: color.palette.darkSkyBlue,
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: spacing[6],
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

interface Props {
  showDetails: Show
}

export const ProgressSection = observer(({ showDetails }: Props) => {
  const { startDate, taskData } = showDetails
  const {
    progress: taskProgress,
    completedTaskCount,
    totalTaskCount,
  } = calcProgress(taskData)
  const daysRemaining = calcDaysRemaining(startDate)

  return (
    <View style={styles.progressContainer}>
      <View style={styles.circleProgressContainer}>
        <ProgressCircle
          size={70}
          width={6}
          backgroundWidth={6}
          fill={taskProgress * 100}
          backgroundColor={color.palette.iceBlue}
          tintColor={color.palette.darkSkyBlue}
          rotation={0}
          duration={0}
        >
          {fill => <Text style={styles.circleProgressText}>{`${fill}%`}</Text>}
        </ProgressCircle>
      </View>
      <View style={styles.barProgressContainer}>
        <View style={styles.barProgress}>
          <View style={styles.barLabelContainer}>
            <Text style={styles.barLabelText}>Tasks Complete</Text>
            <Text style={styles.barLabelNumber}>
              {completedTaskCount.toString()}/{totalTaskCount.toString()}
            </Text>
          </View>
          <Progress.Bar
            color={color.palette.waterBlue}
            unfilledColor={color.palette.iceBlue}
            progress={taskProgress}
            height={6}
            width={PROGRESS_BAR_WIDTH}
            borderWidth={0}
          />
        </View>
        <View style={styles.barProgress}>
          <View style={styles.barLabelContainer}>
            <Text style={styles.barLabelText}>Days Remaining</Text>
            <Text style={styles.barLabelNumber}>
              {daysRemaining.toString()}
            </Text>
          </View>
          <Progress.Bar
            color={color.palette.darkGreyBlue}
            unfilledColor={color.palette.iceBlue}
            progress={0}
            height={6}
            width={PROGRESS_BAR_WIDTH}
            borderWidth={0}
          />
        </View>
      </View>
    </View>
  )
})
