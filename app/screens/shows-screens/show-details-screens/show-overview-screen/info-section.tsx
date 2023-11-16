import * as React from 'react'
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Show } from '../../../../services/api'
import { FontIcon, InAppBrowser, Text } from '../../../../components'
import { color, typography, spacing } from '../../../../theme'
import { displayDateRange } from '../../../../utils/date'
import { isValidUrl } from '../../../../utils/link'

interface Styles {
  description: TextStyle
  firstItem: ViewStyle
  iconContainer: ViewStyle
  link: TextStyle
  listItem: ViewStyle
  title: TextStyle
  titleContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  description: {
    fontSize: typography.fontSize.tiny,
  },
  firstItem: {
    marginTop: 0,
  },
  iconContainer: {
    paddingHorizontal: spacing[4],
  },
  link: {
    color: color.palette.ceruleanBlue,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  listItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: spacing[3],
  },
  title: {
    color: color.palette.dusk,
    fontSize: typography.fontSize.small,
  },
  titleContainer: {
    flex: 1,
  },
})

const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url)
    } else Linking.openURL(url)
  } catch (error) {}
}

interface Props {
  showDetails: Show
}

export const InfoSection = observer(({ showDetails }: Props) => {
  const {
    startDate,
    endDate,
    location,
    website,
    quickfactsLink,
    venueFloorplan,
  } = showDetails

  const dateRange = displayDateRange(startDate, endDate, { showWeekDay: true })

  const items: React.ReactNode[] = []

  if (dateRange) {
    items.push(
      <View style={{ ...styles.listItem, ...styles.firstItem }} key="date">
        <View style={styles.iconContainer}>
          <FontIcon
            pack="entypo"
            name="calendar"
            size={18}
            color={color.palette.lightBlueGrey}
          />
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{dateRange}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.description}>10:00 AM - 6:00 PM CDT</Text>
          </View>
        </View>
      </View>
    )
  }

  if (location) {
    items.push(
      <View style={styles.listItem} key="location">
        <View style={styles.iconContainer}>
          <FontIcon
            pack="simple-line"
            name="location-pin"
            size={18}
            color={color.palette.lightBlueGrey}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{location.name}</Text>
        </View>
      </View>
    )
  }

  if (website) {
    items.push(
      <View style={styles.listItem} key="website">
        <View style={styles.iconContainer}>
          <FontIcon
            pack="material"
            name="link"
            size={18}
            color={color.palette.lightBlueGrey}
          />
        </View>
        <View style={styles.titleContainer}>
          {isValidUrl(website) ? (
            <TouchableOpacity onPress={() => openLink(website)}>
              <Text style={styles.link}>{website}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>{website}</Text>
          )}
        </View>
      </View>
    )
  }

  if (quickfactsLink) {
    items.push(
      <View style={styles.listItem} key="quickfactsLink">
        <View style={styles.iconContainer}>
          <FontIcon
            pack="material"
            name="link"
            size={18}
            color={color.palette.lightBlueGrey}
          />
        </View>
        <View style={styles.titleContainer}>
          {isValidUrl(quickfactsLink) ? (
            <TouchableOpacity onPress={() => openLink(quickfactsLink)}>
              <Text style={styles.link}>{quickfactsLink}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>{quickfactsLink}</Text>
          )}
        </View>
      </View>
    )
  }

  if (venueFloorplan) {
    items.push(
      <View style={styles.listItem} key="venueFloorplan">
        <View style={styles.iconContainer}>
          <FontIcon
            pack="material"
            name="event-note"
            size={18}
            color={color.palette.lightBlueGrey}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{venueFloorplan}</Text>
        </View>
      </View>
    )
  }

  return <>{items}</>
})
