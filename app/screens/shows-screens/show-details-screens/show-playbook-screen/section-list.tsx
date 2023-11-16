import * as React from 'react'
import { StyleSheet, TextStyle, ViewStyle, View } from 'react-native'
import {
  List,
  ListProps,
  Text,
  ListItem,
  Empty,
  FontIcon,
} from '../../../../components'
import { SectionsResult, Section } from '../../../../services/api'
import { color, typography, spacing } from '../../../../theme'

interface Styles {
  contentContainer: ViewStyle
  emptyContainerStyle: ViewStyle
  contentPaddingTop: ViewStyle
  list: ViewStyle
  listItem: ViewStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing[4],
    paddingRight: spacing[2],
  },
  contentPaddingTop: {
    paddingTop: 20,
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
    padding: 0,
  },
  title: {
    color: color.heading,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
  },
})

interface ListItemProps {
  item: Section
  index?: number
}

interface SectionListProps extends ListProps {
  onItemPress?: (item: Section) => void
  sectionsData: SectionsResult
  isLoading: boolean
}

export const SectionList = ({
  onItemPress,
  sectionsData,
  isLoading,
  ...rest
}: SectionListProps) => {
  const renderItem = ({ item, index }: ListItemProps) => {
    const onPress = () => {
      if (onItemPress) {
        onItemPress(item)
      }
    }
    return (
      <ListItem key={item._id} style={styles.listItem} onPress={onPress}>
        <View
          style={[
            styles.contentContainer,
            index === 0 && styles.contentPaddingTop,
          ]}
        >
          <Text style={styles.title}>{item.name}</Text>
          <FontIcon
            name="chevron-right"
            pack="feather"
            size={20}
            color={color.palette.lightBlueGrey}
          />
        </View>
      </ListItem>
    )
  }

  return (
    <List
      style={styles.list}
      data={sectionsData.list}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        isLoading ? null : (
          <Empty
            description="No sections found."
            containerStyle={styles.emptyContainerStyle}
          />
        )
      }
      {...rest}
    />
  )
}
