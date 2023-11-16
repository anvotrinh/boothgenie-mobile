import * as React from 'react'
import { RefreshControl, StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../models/root-store'
import { color } from '../../../theme'
import { TrainingList } from './training-list'
import { Training } from '../../../services/api'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export type TrainingsScreenProps = NavigationScreenProp<{}>

export const TrainingsScreen: React.FunctionComponent<TrainingsScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      trainingStore: {
        getTrainings,
        trainingsData,
        getTrainingsLoading,
        setTrainingDetails,
      },
    } = useStores()

    React.useEffect(() => {
      getTrainings()
    }, [])

    const onItemPress = (item: Training) => {
      setTrainingDetails(item)
      navigateTo({
        routeName: 'trainingDetails',
        params: {
          training: item,
        },
      })
    }

    return (
      <View style={styles.screen} testID="TrainingListScreen">
        <TrainingList
          onItemPress={onItemPress}
          trainingsData={trainingsData}
          isLoading={getTrainingsLoading}
          refreshControl={
            <RefreshControl
              refreshing={getTrainingsLoading}
              onRefresh={getTrainings}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
