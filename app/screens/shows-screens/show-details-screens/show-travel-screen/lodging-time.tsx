import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { displayFullDate } from '../../../../utils/date'
import { Lodging } from '../../../../services/api'
import { getFullName } from '../../../../utils/user'

interface Styles {
  lodgingDetailContainer: ViewStyle
  lodgingDetailColumn: ViewStyle
  lodgingDetailTitle: TextStyle
  lodgingDetail: TextStyle
  vicinityText: TextStyle
  locationText: TextStyle
  containerStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  containerStyle: {
    backgroundColor: color.palette.white,
    marginBottom: spacing[4],
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
  locationText: {
    color: color.palette.darkGreyBlue,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[4],
  },
  lodgingDetail: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    marginBottom: spacing[3],
  },
  lodgingDetailColumn: {
    flex: 1,
  },
  lodgingDetailContainer: {
    flexDirection: 'row',
  },
  lodgingDetailTitle: {
    color: color.palette.dusk,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.bold,
  },
  vicinityText: {
    color: color.palette.ceruleanBlue,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing[2],
    width: '60%',
  },
})

interface LodgingTimeProps {
  data: Lodging
  containerStyle: ViewStyle
}

export const LodgingTime = ({ data, containerStyle }: LodgingTimeProps) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Text style={styles.locationText}>{data.location.name}</Text>

      <Text style={styles.vicinityText}>{data.location.vicinity}</Text>
      <View style={styles.lodgingDetailContainer}>
        <View style={styles.lodgingDetailColumn}>
          <Text style={styles.lodgingDetailTitle}>CHECK IN</Text>
          <Text style={styles.lodgingDetail}>
            {displayFullDate(data.checkinDate)}
          </Text>
          <Text style={styles.lodgingDetailTitle}>CONFIRMATION #</Text>
          <Text style={styles.lodgingDetail}>{data.confirmationCode}</Text>
        </View>
        <View style={styles.lodgingDetailColumn}>
          <Text style={styles.lodgingDetailTitle}>CHECK OUT</Text>
          <Text style={styles.lodgingDetail}>
            {displayFullDate(data.checkoutDate)}
          </Text>
          <Text style={styles.lodgingDetailTitle}>RESERVATION HOLDER</Text>
          <Text style={styles.lodgingDetail}>
            {getFullName(
              data.travelerID?.firstName || '',
              data.travelerID?.lastName || ''
            )}
          </Text>
        </View>
      </View>
    </View>
  )
}
