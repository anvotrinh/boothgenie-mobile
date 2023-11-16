import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Dash from 'react-native-dash'
import { Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { TimeTravel } from '../../../../services/api'
import { displayDayAndDate, displayTime } from '../../../../utils/date'

interface Styles {
  airport: TextStyle
  dash: ViewStyle
  date: TextStyle
  dateTimeContainer: ViewStyle
  dot: ViewStyle
  time: TextStyle
  timelineItem: ViewStyle
}

const LIST_ITEM_MARGIN_BOTTOM = spacing[6]
const DATE_TIME_LINE_HEIGHT = 20
const DOT_SIZE = 7

const styles = StyleSheet.create<Styles>({
  airport: {
    color: color.palette.darkIndigo,
    marginLeft: spacing[5],
  },
  dash: {
    flexDirection: 'column',
    marginLeft: 3,
    position: 'absolute',
    zIndex: -1,
  },
  date: {
    color: color.palette.cloudyBlue,
  },
  dateTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    lineHeight: DATE_TIME_LINE_HEIGHT,
    marginBottom: spacing[2],
  },
  dot: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.cloudyBlue,
    borderRadius: spacing[1],
    borderWidth: 1,
    height: DOT_SIZE,
    width: DOT_SIZE,
  },
  time: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
    marginHorizontal: spacing[4],
  },
  timelineItem: {
    marginBottom: LIST_ITEM_MARGIN_BOTTOM,
  },
})

interface Props {
  data: TimeTravel
}

export const Timeline = ({ data }: Props) => {
  const [dashLength, setDashLength] = React.useState(0)
  const [dashMarginTop, setDashMarginTop] = React.useState(0)

  return (
    <View>
      <Dash
        style={{ ...styles.dash, height: dashLength, marginTop: dashMarginTop }}
        dashThickness={1}
        dashColor={color.palette.cloudyBlue}
      />
      <View
        style={styles.timelineItem}
        onLayout={({ nativeEvent: { layout } }) => {
          setDashLength(layout.height + LIST_ITEM_MARGIN_BOTTOM)
        }}
      >
        <View
          style={styles.dateTimeContainer}
          onLayout={({ nativeEvent: { layout } }) => {
            setDashMarginTop(layout.height / 2)
          }}
        >
          <View style={styles.dot} />
          <Text style={styles.time}>{displayTime(data.departure.time)}</Text>
          <Text style={styles.date}>
            {displayDayAndDate(data.departure.time)}
          </Text>
        </View>
        <View>
          <Text style={styles.airport}>{data.departure.airport?.name}</Text>
        </View>
      </View>

      <View style={styles.timelineItem}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dot} />
          <Text style={styles.time}>{displayTime(data.arrival.time)}</Text>
          <Text style={styles.date}>
            {displayDayAndDate(data.arrival.time)}
          </Text>
        </View>
        <View>
          <Text style={styles.airport}>{data.arrival.airport?.name}</Text>
        </View>
      </View>
    </View>
  )
}
