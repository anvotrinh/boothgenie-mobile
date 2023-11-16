import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color, spacing, typography } from '../../../../theme'
import { Task } from '../../../../models/stores'
import { Text, AvatarList } from '../../../../components'
import { displayFullDate } from '../../../../utils/date'

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
    alignItems: 'center',
    flexDirection: 'row',
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
    alignItems: 'center',
    backgroundColor: color.palette.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export type ShowTaskDetailsScreenProps = NavigationScreenProps<{}>

export const ShowTaskDetailsScreen: React.FunctionComponent<ShowTaskDetailsScreenProps> = observer(
  (props: ShowTaskDetailsScreenProps) => {
    const task: Task = props.navigation.getParam('task' as never)

    React.useEffect(() => {
      props.navigation.setParams({ task })
    }, [])

    return (
      <View style={styles.screen} testID="ShowTaskDetailsScreen">
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.value}>{`Due: ${displayFullDate(
            task.dueDate
          )}`}</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Show</Text>
          <Text style={styles.value}>{task.showID.showName}</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Stage</Text>
          <Text style={styles.value}>{task.stageID.name}</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.label}>Assigned</Text>
          <View style={styles.avatarWrapper}>
            <AvatarList sources={task.taskAssignedUsers} />
            {task.taskAssignedUsers.length === 1 && (
              <Text style={{ ...styles.value, ...styles.marginLeft }}>
                {`${task.taskAssignedUsers[0].firstName} ${task.taskAssignedUsers[0].lastName}`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      </View>
    )
  }
)
