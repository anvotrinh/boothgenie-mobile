import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Dash from 'react-native-dash'
import { Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { displayFlightDate } from '../../../../utils/date'
import { Flight } from '../../../../services/api'

interface Styles {
  dash: ViewStyle
  date: TextStyle
  dateTimeContainer: ViewStyle
  dot: ViewStyle
  time: TextStyle
  timelineItem: ViewStyle
  timelineItemLast: ViewStyle
  flightDetailContainer: ViewStyle
  flightDetailColumn: ViewStyle
  flightDetailTitle: TextStyle
  flightDetail: TextStyle
  viewContainer: ViewStyle
}

const LIST_ITEM_MARGIN_BOTTOM = spacing[7]
const DATE_TIME_LINE_HEIGHT = 20
const DOT_SIZE = 7

const styles = StyleSheet.create<Styles>({
  dash: {
    flexDirection: 'column',
    height: 100,
    marginLeft: 35,
    marginTop: 25,
    position: 'absolute',
    zIndex: -1,
  },
  date: {
    color: color.palette.cloudyBlue,
    marginLeft: spacing[5],
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
  flightDetail: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    marginBottom: spacing[3],
  },
  flightDetailColumn: {
    flex: 1,
  },
  flightDetailContainer: {
    flexDirection: 'row',
  },
  flightDetailTitle: {
    color: color.palette.dusk,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.bold,
  },
  time: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
    marginHorizontal: spacing[4],
    marginLeft: spacing[4],
  },
  timelineItem: {
    marginBottom: LIST_ITEM_MARGIN_BOTTOM,
  },
  timelineItemLast: {
    marginBottom: spacing[4],
  },
  viewContainer: {
    backgroundColor: color.palette.white,
    marginBottom: spacing[4],
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
})

interface FlightTimeProps {
  data: Flight
  containerStyle: ViewStyle
}

export const FlightTime = ({ data, containerStyle }: FlightTimeProps) => {
  return (
    <View style={[styles.viewContainer, containerStyle]}>
      <Dash
        style={styles.dash}
        dashThickness={1}
        dashColor={color.palette.cloudyBlue}
      />
      <View style={styles.timelineItem}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dot} />
          <Text style={styles.time}>
            {data.departureAirport.code || data.departureAirport.name}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>
            {displayFlightDate(data.departureDate)}
          </Text>
        </View>
      </View>

      <View style={styles.timelineItemLast}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dot} />
          <Text style={styles.time}>
            {data.arrivalAirport.code || data.arrivalAirport.name}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>{displayFlightDate(data.arrivalDate)}</Text>
        </View>
      </View>

      <View style={styles.flightDetailContainer}>
        <View style={styles.flightDetailColumn}>
          <Text style={styles.flightDetailTitle}>AIRLINE</Text>
          <Text style={styles.flightDetail}>{data.airline}</Text>
          <Text style={styles.flightDetailTitle}>CONFIRMATION #</Text>
          <Text style={styles.flightDetail}>{data.confirmationNumber}</Text>
        </View>
        <View style={styles.flightDetailColumn}>
          <Text style={styles.flightDetailTitle}>FLIGHT #</Text>
          <Text style={styles.flightDetail}>{data.flightNumber}</Text>
          <Text style={styles.flightDetailTitle}>SEAT</Text>
          <Text style={styles.flightDetail}>{data.seat}</Text>
        </View>
      </View>
    </View>
  )
}
