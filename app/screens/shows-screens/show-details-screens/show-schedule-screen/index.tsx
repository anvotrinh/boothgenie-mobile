import * as React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../models/root-store'
import {
  Empty,
  Spinner,
  Table,
  TableCell,
  TableSection,
  TableSectionHeader,
} from '../../../../components'
import { color, spacing } from '../../../../theme'
import { displayTime } from '../../../../utils/date'
import { DateTabs } from './date-tabs'

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

export type ShowScheduleScreenProps = NavigationScreenProp<{}>

export const ShowScheduleScreen: React.FunctionComponent<ShowScheduleScreenProps> = observer(
  () => {
    const {
      eventStore: { setSelectedEvent },
      navigationStore: { navigateTo },
      showStore: { showDetails },
      scheduleStore: {
        getSchedules,
        getSchedulesLoading,
        getScheduleByIdLoading,
        schedules,
        scheduleDetails,
      },
    } = useStores()

    React.useEffect(() => {
      if (showDetails._id) {
        getSchedules(showDetails._id)
      }
    }, [])

    if (getSchedulesLoading || getScheduleByIdLoading) return <Spinner />

    if (schedules.list.length === 0) {
      return (
        <Empty
          description="No schedules found."
          containerStyle={styles.emptyContainerStyle}
        />
      )
    }

    return (
      <View testID="ShowScheduleScreen" style={styles.screen}>
        <DateTabs schedules={schedules} />
        {scheduleDetails.eventIDs.length > 0 ? (
          <ScrollView>
            <Table>
              {scheduleDetails.eventIDs.map(event => {
                const startTime = displayTime(event.startTime)
                const endTime = displayTime(event.endTime)
                const description = `${startTime} - ${endTime}, ${event.location.name}`
                return (
                  <TableSection
                    headerComponent={<TableSectionHeader text={startTime} />}
                    key={event._id}
                  >
                    <TableCell
                      cellStyle="Subtitle"
                      title={event.name}
                      detail={description}
                      accessory="DisclosureIndicator"
                      onPress={() => {
                        setSelectedEvent(event)
                        navigateTo({
                          routeName: 'showDetails:schedule:event-details',
                        })
                      }}
                    />
                  </TableSection>
                )
              })}
            </Table>
          </ScrollView>
        ) : (
          <Empty
            description="No events found."
            containerStyle={styles.emptyContainerStyle}
          />
        )}
      </View>
    )
  }
)
