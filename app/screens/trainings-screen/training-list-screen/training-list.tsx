import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  List,
  ListProps,
  Text,
  ListItem,
  Empty,
  CheckIcon,
} from '../../../components'
import { TrainingsResult } from '../../../services/api'
import { Training } from '../../../models/stores'
import { color, typography, spacing } from '../../../theme'

interface Styles {
  emptyContainerStyle: ViewStyle
  list: ViewStyle
  listTitleWrapper: ViewStyle
  listTitle: TextStyle
  listItem: ViewStyle
  contentContainer: ViewStyle
  titleWrapper: ViewStyle
  title: TextStyle
  date: TextStyle
  circleProgressText: TextStyle
}

const styles = StyleSheet.create<Styles>({
  circleProgressText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  date: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
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
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },
  listTitleWrapper: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.athensGrey,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: spacing[5],
    paddingVertical: 10,
  },
  title: {
    color: color.heading,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semiBold,
  },
  titleWrapper: {
    flex: 1,
  },
})

interface TrainingItemProps {
  item: Training
  onItemPress?: (item: Training) => void
}

interface ListItemProps {
  item: Training
  index?: number
}

interface TrainingListProps extends ListProps {
  onItemPress?: (item: Training) => void
  trainingsData: TrainingsResult
  isLoading: boolean
}

export const TrainingItem = observer(
  ({ item, onItemPress }: TrainingItemProps) => {
    const onPress = () => {
      if (onItemPress) {
        onItemPress(item)
      }
    }
    return (
      <ListItem key={item._id} style={styles.listItem} onPress={onPress}>
        <View style={styles.contentContainer}>
          <CheckIcon isChecked={item.status === 'COMPLETED'} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.date}>14 days remaining</Text>
          </View>
        </View>
      </ListItem>
    )
  }
)

export const TrainingList = observer(
  ({ onItemPress, trainingsData, isLoading, ...rest }: TrainingListProps) => {
    const showCount = {}

    const renderItem = ({ item }: ListItemProps) => {
      const showID = item.showID._id
      if (!showCount[showID]) {
        showCount[showID] = 1
      } else {
        showCount[showID]++
      }
      return (
        <>
          {showCount[showID] === 1 && (
            <View style={styles.listTitleWrapper}>
              <Text style={styles.listTitle}>{item.showID.showName}</Text>
            </View>
          )}
          <TrainingItem item={item} onItemPress={onItemPress} />
        </>
      )
    }

    return (
      <List
        style={styles.list}
        data={trainingsData.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? null : (
            <Empty
              description="No trainings found."
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
        {...rest}
      />
    )
  }
)
