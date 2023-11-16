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
  AvatarList,
} from '../../../../components'
import { TasksResult } from '../../../../services/api'
import { Task } from '../../../../models/stores'
import { displayDate } from '../../../../utils/date'
import { color, typography, spacing } from '../../../../theme'

interface Styles {
  emptyContainerStyle: ViewStyle
  list: ViewStyle
  listTitleWrapper: ViewStyle
  listTitle: TextStyle
  listItem: ViewStyle
  contentContainer: ViewStyle
  leftContent: ViewStyle
  rightContent: ViewStyle
  titleWrapper: ViewStyle
  title: TextStyle
  date: TextStyle
}

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: spacing[1],
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
    borderColor: color.palette.backgroundGrey,
    borderTopWidth: spacing[3],
    paddingLeft: spacing[4],
    paddingVertical: 7,
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
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
  index?: number
}

interface TaskListProps extends ListProps {
  onItemPress?: (item: Task) => void
  tasksData: TasksResult
  isLoading: boolean
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
          </View>
        </View>
        <View style={styles.rightContent}>
          <AvatarList sources={item.taskAssignedUsers} />
          <Text style={styles.date}>{displayDate(item.dueDate)}</Text>
        </View>
      </View>
    </ListItem>
  )
})

export const TaskList = ({
  onItemPress,
  tasksData,
  isLoading,
  ...rest
}: TaskListProps) => {
  const stageCount = {}

  const renderItem = ({ item }: ListItemProps) => {
    const stageId = item.stageID._id
    if (!stageCount[stageId]) {
      stageCount[stageId] = 1
    } else {
      stageCount[stageId]++
    }
    return (
      <>
        {stageCount[stageId] === 1 && (
          <View style={styles.listTitleWrapper}>
            <Text style={styles.listTitle}>{item.stageID.name}</Text>
          </View>
        )}
        <TaskItem item={item} onItemPress={onItemPress} />
      </>
    )
  }

  return (
    <List
      style={styles.list}
      data={tasksData.list}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        isLoading ? null : (
          <Empty
            description="No tasks found."
            containerStyle={styles.emptyContainerStyle}
          />
        )
      }
      {...rest}
    />
  )
}
