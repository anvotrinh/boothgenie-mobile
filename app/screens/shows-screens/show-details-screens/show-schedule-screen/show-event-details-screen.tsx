import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color, spacing, typography } from '../../../../theme'
import { useStores } from '../../../../models/root-store'
import { Empty, Text, AvatarList, Spinner } from '../../../../components'
import { displayTime } from '../../../../utils/date'

interface Styles {
  screen: ViewStyle
  titleWrapper: ViewStyle
  title: TextStyle
  lineWrapper: ViewStyle
  label: TextStyle
  value: TextStyle
  marginLeft: TextStyle
  avatarWrapper: ViewStyle
  descriptionWrapper: ViewStyle
  description: TextStyle
}

const styles = StyleSheet.create<Styles>({
  avatarWrapper: {
    marginTop: spacing[1],
  },
  description: {
    color: color.palette.blueyGrey,
    fontSize: 11,
  },
  descriptionWrapper: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    paddingHorizontal: spacing[5],
    paddingVertical: 7,
  },
  label: {
    color: color.palette.darkIndigo,
    fontWeight: typography.fontWeight.medium,
  },
  lineWrapper: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    paddingHorizontal: spacing[5],
    paddingVertical: 7,
  },
  marginLeft: {
    marginLeft: spacing[1],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  title: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.navHeadingMain,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: spacing[6],
  },
  titleWrapper: {
    backgroundColor: color.palette.white,
    padding: spacing[5],
  },
  value: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
  },
})

export type ShowEventDetailsScreenProps = NavigationScreenProp<{}>

export const ShowEventDetailsScreen: React.FunctionComponent<ShowEventDetailsScreenProps> = observer(
  () => {
    const {
      eventStore: {
        getEventById,
        getEventByIdLoading,
        eventDetails,
        selectedEvent,
      },
      scheduleStore: { scheduleDetails },
      showStore: { showDetails },
    } = useStores()

    React.useEffect(() => {
      if (showDetails._id && scheduleDetails._id && selectedEvent._id) {
        getEventById(showDetails._id, scheduleDetails._id, selectedEvent._id)
      }
    }, [])

    if (getEventByIdLoading) return <Spinner />

    if (!eventDetails._id) {
      return <Empty description="Event not found." />
    }

    const startTime = displayTime(eventDetails.startTime)
    const endTime = displayTime(eventDetails.endTime)

    return (
      <View style={styles.screen} testID="ShowEventDetailsScreen">
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{eventDetails.name}</Text>
          <Text style={styles.value}>{`${startTime} - ${endTime}`}</Text>
          <View style={styles.avatarWrapper}>
            <AvatarList sources={eventDetails.eventAssignees} />
          </View>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{eventDetails.location.name}</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{eventDetails.description}</Text>
        </View>
      </View>
    )
  }
)
