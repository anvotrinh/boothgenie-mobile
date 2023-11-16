import * as React from 'react'
import {
  RefreshControl,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../models/root-store'
import { color } from '../../theme'
import { TaskList } from './task-list'
import { Task } from '../../services/api'

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

export type MyTaskScreenProps = NavigationScreenProp<{}>

export const MyTaskScreen: React.FunctionComponent<MyTaskScreenProps> = observer(
  () => {
    const {
      navigationStore: { navigateTo },
      taskStore: { getMyTasks, myTasksData, myTasksLoading },
    } = useStores()

    React.useEffect(() => {
      getMyTasks()
    }, [])

    const onItemPress = (item: Task) => {
      navigateTo({
        routeName: 'taskDetails',
        params: {
          task: item,
        },
      })
    }

    return (
      <View style={styles.screen} testID="MyTaskScreen">
        <TaskList
          onItemPress={onItemPress}
          tasksData={myTasksData}
          myTasksLoading={myTasksLoading}
          refreshControl={
            <RefreshControl
              refreshing={myTasksLoading}
              onRefresh={getMyTasks}
              tintColor={color.palette.darkSkyBlue}
            />
          }
        />
      </View>
    )
  }
)
