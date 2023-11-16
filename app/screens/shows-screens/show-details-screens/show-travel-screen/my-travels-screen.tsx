import * as React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Empty, Spinner } from '../../../../components'
import { color, spacing } from '../../../../theme'
import { Travel } from '../../../../services/api'
import { useStores } from '../../../../models/root-store'
import { FlightTime } from './flight-time'
import { LodgingTime } from './lodging-time'

interface Styles {
  emptyContainerStyle: ViewStyle
  firstSection: ViewStyle
  h3: ViewStyle
  hotelContainer: ViewStyle
  screen: ViewStyle
  section: ViewStyle
  flightStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  firstSection: {
    marginTop: spacing[4],
  },
  flightStyle: {
    marginBottom: 0,
    marginTop: spacing[2],
  },
  h3: {
    marginBottom: spacing[4],
  },
  hotelContainer: {
    marginBottom: spacing[5],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  section: {
    marginBottom: spacing[4],
  },
})

export type ShowMyTravelsScreenProps = NavigationScreenProp<{}>

export const ShowMyTravelsScreen: React.FunctionComponent<ShowMyTravelsScreenProps> = observer(
  () => {
    const {
      showStore: { showDetails },
      travelStore: { getMyTravels, getMyTravelsLoading, myTravels },
    } = useStores()

    React.useEffect(() => {
      if (showDetails._id) {
        getMyTravels(showDetails._id)
      }
    }, [])

    if (getMyTravelsLoading) return <Spinner />

    if (myTravels.list.length === 0) {
      return (
        <Empty
          description="No travels found."
          containerStyle={styles.emptyContainerStyle}
        />
      )
    }

    return (
      <ScrollView
        testID="ShowMyTravelsScreen"
        style={styles.screen}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {myTravels.list.map((travel: Travel, index: number) => {
          return (
            <View
              key={travel._id}
              style={
                index === 0
                  ? { ...styles.section, ...styles.firstSection }
                  : styles.section
              }
            >
              {travel.flightIDs.map(flight => {
                return (
                  <FlightTime
                    key={flight._id}
                    data={flight}
                    containerStyle={styles.flightStyle}
                  ></FlightTime>
                )
              })}
              {travel.lodgingIDs.map(lodging => {
                return (
                  <LodgingTime
                    key={lodging._id}
                    data={lodging}
                    containerStyle={styles.flightStyle}
                  ></LodgingTime>
                )
              })}
            </View>
          )
        })}
      </ScrollView>
    )
  }
)
