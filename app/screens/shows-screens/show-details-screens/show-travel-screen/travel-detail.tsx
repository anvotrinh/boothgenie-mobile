import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp, ScrollView } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { spacing } from '../../../../theme'
import { FlightTime } from './flight-time'
import { TravelItem } from './all-travels-screen'
import { LodgingTime } from './lodging-time'
import { useStores } from '../../../../models/root-store'

interface Styles {
  flightStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  flightStyle: {
    marginBottom: 0,
    marginTop: spacing[2],
  },
})

export interface TravelDetailScreenProps extends NavigationScreenProp<{}> {
  navigation: any
}

export const TravelDetailScreen: React.FunctionComponent<TravelDetailScreenProps> = observer(
  ({ navigation }: TravelDetailScreenProps) => {
    const travelDetail = navigation.getParam('travelDetail')
    const {
      showStore: { showDetails },
    } = useStores()

    const users = [...showDetails.showStaffers, ...showDetails.managedBy]
    const user = users.find(user => user._id === travelDetail.userID)

    return (
      <ScrollView>
        <View style={{ marginTop: spacing[3] }}>
          <TravelItem item={travelDetail} user={user}></TravelItem>
          {travelDetail.flightIDs?.map(flight => {
            return (
              <FlightTime
                key={flight._id}
                data={flight}
                containerStyle={styles.flightStyle}
              ></FlightTime>
            )
          })}
          {travelDetail.lodgingIDs?.map(lodging => {
            return (
              <LodgingTime
                key={lodging._id}
                data={lodging}
                containerStyle={styles.flightStyle}
              ></LodgingTime>
            )
          })}
        </View>
      </ScrollView>
    )
  }
)
