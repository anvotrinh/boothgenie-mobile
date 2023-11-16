import * as React from 'react'
import { observer } from 'mobx-react-lite'
import {
  Dimensions,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { SchedulesResult } from '../../../../services/api'
import { TabView, Text } from '../../../../components'
import { color, typography } from '../../../../theme'
import { getDayInMonth, getWeekDay } from '../../../../utils/date'

interface Styles {
  container: ViewStyle
  dateCircle: ViewStyle
  dayInMonth: TextStyle
  dayInWeek: TextStyle
  iconStyle: ViewStyle
  selectedDateCircle: ViewStyle
  tab: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: color.palette.white,
    position: 'relative',
  },
  dateCircle: {
    alignItems: 'center',
    backgroundColor: color.palette.white,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  dayInMonth: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.fontSize.h3,
  },
  dayInWeek: {
    fontSize: typography.fontSize.tiny,
    lineHeight: typography.fontSize.tiny,
  },
  iconStyle: {
    minWidth: 70,
  },
  selectedDateCircle: {
    backgroundColor: color.palette.deepSkyBlue,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
})

interface Props {
  schedules: SchedulesResult
}

const getTabWidth = (tabNum: number) => {
  const windowWidth = Dimensions.get('window').width

  if (tabNum === 0) {
    return 0
  }

  if (tabNum <= 3) {
    return windowWidth / tabNum
  }

  return windowWidth / 3
}

export const DateTabs = observer(({ schedules }: Props) => {
  const defaultTab = schedules.list.length > 0 ? schedules.list[0]._id : ''
  const [selectedTab, setSelectedTab] = React.useState(defaultTab)

  const onSelectTab = (el: React.ReactNode) => {
    if (el && el.props && el.props.name) {
      setSelectedTab(el.props.name)
    }
  }

  const tabWidth = getTabWidth(schedules.list.length)

  return (
    <TabView style={styles.container} onSelect={onSelectTab}>
      {schedules.list.map(schedule => {
        const { scheduleDate } = schedule
        const backgroundColor =
          schedule._id === selectedTab
            ? color.palette.deepSkyBlue
            : color.palette.white
        const textColor =
          schedule._id === selectedTab
            ? color.palette.white
            : color.palette.blueyGrey

        return (
          <View
            name={schedule._id}
            style={{
              ...styles.tab,
              width: tabWidth,
            }}
            iconStyle={styles.iconStyle}
            key={schedule._id}
          >
            <View
              style={{
                ...styles.dateCircle,
                backgroundColor,
              }}
            >
              <Text style={{ ...styles.dayInWeek, color: textColor }}>
                {getWeekDay(scheduleDate)}
              </Text>
              <Text style={{ ...styles.dayInMonth, color: textColor }}>
                {getDayInMonth(scheduleDate).toString()}
              </Text>
            </View>
          </View>
        )
      })}
    </TabView>
  )
})
