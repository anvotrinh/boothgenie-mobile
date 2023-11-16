import * as React from 'react'
import {
  Dimensions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  AvatarList,
  Empty,
  FontIcon,
  List,
  ListProps,
  ListItem,
  Progress,
  Text,
} from '../../../components'
import { Show, ShowsResult } from '../../../services/api'
import { useStores } from '../../../models/root-store'
import { color, spacing, typography } from '../../../theme'
import { displayDateRange } from '../../../utils/date'
import { toTitleCase } from '../../../utils/string'
import { calcProgress } from '../../../utils/progress'

const PROGRESS_BAR_WIDTH = Dimensions.get('screen').width - 16 - 32 - 70

interface Styles {
  contentContainer: ViewStyle
  description: TextStyle
  emptyContainerStyle: ViewStyle
  leftContent: ViewStyle
  list: ViewStyle
  listItem: ViewStyle
  progressContainer: ViewStyle
  progressBar: ViewStyle
  progressNumber: TextStyle
  rightContent: ViewStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  description: {
    fontSize: typography.fontSize.small,
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  leftContent: {
    flex: 1,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    borderRadius: 3,
    elevation: 2,
    flexDirection: 'column',
    marginVertical: 5,
    paddingHorizontal: spacing[4],
    paddingVertical: 10,
    shadowColor: color.palette.darkIndigo,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  progressBar: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    lineHeight: typography.fontSize.regular,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  progressNumber: {
    color: color.palette.darkIndigo,
    fontWeight: typography.fontWeight.semiBold,
    textAlign: 'right',
  },
  rightContent: {},
  title: {
    color: color.heading,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
  },
})

interface ListItemProps {
  item: Show
  index: number
}

interface ShowListProps extends ListProps {
  showsData: ShowsResult
  showsLoading: boolean
}

export const ShowList = observer(
  ({ showsData, showsLoading, ...rest }: ShowListProps) => {
    const {
      navigationStore: { navigateTo },
      showStore: { setShowDetails, setSelectedShowDetailsTab },
    } = useStores()

    const renderItem = ({ item, index }: ListItemProps) => {
      const { taskData } = item
      const { progress } = calcProgress(taskData)

      const onPress = () => {
        setShowDetails(item)
        setSelectedShowDetailsTab({
          title: 'Overview',
          route: 'showDetails:overview',
        })
        navigateTo({
          routeName: 'showDetails',
        })
      }

      return (
        <ListItem key={index} style={styles.listItem} onPress={onPress}>
          <View style={styles.contentContainer}>
            <View style={styles.leftContent}>
              <Text style={styles.title}>{item.showName}</Text>
              <Text style={styles.description}>
                {displayDateRange(item.startDate, item.endDate)}{' '}
                <FontIcon pack="evil" name="location" size={14} />{' '}
                {toTitleCase(item.location.name)}
              </Text>
            </View>
            <View style={styles.rightContent}>
              <AvatarList sources={item.showStaffers} />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Progress.Bar
                color={color.palette.waterBlue}
                unfilledColor={color.palette.iceBlue}
                progress={progress}
                height={6}
                width={PROGRESS_BAR_WIDTH}
                borderWidth={0}
              />
            </View>
            <View>
              <Text style={styles.progressNumber}>
                {(Number(progress) * 100).toString()}%
              </Text>
            </View>
          </View>
        </ListItem>
      )
    }

    return (
      <List
        style={styles.list}
        data={showsData.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          showsLoading ? null : (
            <Empty
              description="No shows found."
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
        {...rest}
      />
    )
  }
)
