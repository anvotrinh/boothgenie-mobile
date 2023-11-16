import * as React from 'react'
import {
  RefreshControl,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../models/root-store'
import { color } from '../../../../theme'
import { TaskList } from './task-list'
import { Task } from '../../../../services/api'

interface Styles {
  screen: ViewStyle
  searchIcon: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  searchIcon: {
    height: 30,
    width: 30,
  },
})

export type ShowAllTasksScreenProps = NavigationScreenProps<{}>

export const ShowAllTasksScreen: React.FunctionComponent<ShowAllTasksScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      taskStore: {
        getAllTasksShowDetails,
        allTasksShowDetailsData,
        allTasksShowDetailsLoading,
      },
      showStore: { showDetails },
    } = useStores()

    React.useEffect(() => {
      getAllTasksShowDetails(showDetails._id)
    }, [])

    const onItemPress = (item: Task) => {
      navigateTo({
        routeName: 'showTaskDetails',
        params: {
          task: item,
        },
      })
    }

    return (
      <View style={styles.screen} testID="ShowAllTaskScreen">
        <TaskList
          onItemPress={onItemPress}
          tasksData={allTasksShowDetailsData}
          isLoading={allTasksShowDetailsLoading}
          refreshControl={
            <RefreshControl
              refreshing={allTasksShowDetailsLoading}
              onRefresh={() => getAllTasksShowDetails(showDetails._id)}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
