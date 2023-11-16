import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  List,
  ListProps,
  Text,
  ListItem,
  TaskCheckButton,
  Empty,
} from '../../components'
import { TasksResult } from '../../services/api'
import { Task } from '../../models/stores'
import { displayDate, isOverdue } from '../../utils/date'
import { color, typography, spacing } from '../../theme'

interface Styles {
  emptyContainerStyle: ViewStyle
  listContainer: ViewStyle
  list: ViewStyle
  listTitleWrapper: ViewStyle
  listTitleWrapperBorderTop: ViewStyle
  listTitle: TextStyle
  listItem: ViewStyle
  contentContainer: ViewStyle
  leftContent: ViewStyle
  rightContent: ViewStyle
  titleWrapper: ViewStyle
  title: TextStyle
  description: TextStyle
  date: TextStyle
}

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  date: {
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.semiBold,
  },
  description: {
    fontSize: typography.fontSize.small,
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  leftContent: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    backgroundColor: color.palette.backgroundGrey,
  },
  listContainer: {
    marginTop: spacing[3],
  },
  listItem: {
    backgroundColor: color.palette.white,
    borderBottomWidth: 1,
    borderColor: color.palette.borderGrey,
  },
  listTitle: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
  },
  listTitleWrapper: {
    backgroundColor: color.palette.white,
    paddingLeft: spacing[4],
    paddingVertical: 7,
  },
  listTitleWrapperBorderTop: {
    borderColor: color.palette.backgroundGrey,
    borderTopWidth: spacing[3],
  },
  rightContent: {
    paddingRight: 25,
  },
  title: {
    color: color.heading,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  titleWrapper: {},
})

interface TaskItemProps {
  item: Task
  onItemPress?: (item: Task) => void
}

interface ListItemProps {
  item: Task
  index: number
}

interface TaskListProps extends ListProps {
  onItemPress?: (item: Task) => void
  tasksData: TasksResult
  myTasksLoading: boolean
}

export const TaskItem = observer(({ item, onItemPress }: TaskItemProps) => {
  const onPress = () => {
    if (onItemPress) {
      onItemPress(item)
    }
  }
  const onPressStatus = () => {
    const status = item.status === 'COMPLETED' ? 'INCOMPLETE' : 'COMPLETED'
    item.updateTask({ status })
  }
  return (
    <ListItem key={item._id} style={styles.listItem} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <TaskCheckButton
            isChecked={item.status === 'COMPLETED'}
            onPress={onPressStatus}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.date}>{displayDate(item.dueDate)}</Text>
        </View>
      </View>
    </ListItem>
  )
})

export const TaskList = ({
  onItemPress,
  tasksData,
  myTasksLoading,
  ...rest
}: TaskListProps) => {
  let upcomingCount = 0

  const renderItem = ({ item, index }: ListItemProps) => {
    if (!isOverdue(item.dueDate)) {
      upcomingCount++
    }
    return (
      <>
        {index === 0 && upcomingCount !== 1 && (
          <View style={styles.listTitleWrapper}>
            <Text style={styles.listTitle}>Past Due</Text>
          </View>
        )}
        {upcomingCount === 1 && (
          <View
            style={[
              styles.listTitleWrapper,
              index !== 0 && styles.listTitleWrapperBorderTop,
            ]}
          >
            <Text style={styles.listTitle}>Upcoming</Text>
          </View>
        )}
        <TaskItem item={item} onItemPress={onItemPress} />
      </>
    )
  }

  return (
    <View style={styles.listContainer}>
      <List
        style={styles.list}
        data={tasksData.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          myTasksLoading ? null : (
            <Empty
              description="No tasks found."
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
        {...rest}
      />
    </View>
  )
}
