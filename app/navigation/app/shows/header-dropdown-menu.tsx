import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { DropdownMenu, FontIcon, Text } from '../../../components'
import { color, typography, spacing } from '../../../theme'
import { isIOS } from '../../../utils/platform'
import { useStores } from '../../../models/root-store'

interface Styles {
  button: ViewStyle
  buttonIcon: ViewStyle
  buttonText: TextStyle
  dropdown: ViewStyle
  menu: ViewStyle
  menuIcon: TextStyle
  menuIconContainer: ViewStyle
  menuText: TextStyle
  selectedShowDetailsTab: TextStyle
  selectedShowDetailsTabContainer: ViewStyle
}

const DROPDOWN_BACKGROUND_OVERLAY_COLOR = 'rgba(73, 74, 82, 0.2)'

const styles = StyleSheet.create<Styles>({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    color: color.palette.darkIndigo,
  },
  buttonText: {
    color: color.palette.darkIndigo,
    fontWeight: typography.fontWeight.semiBold,
  },
  dropdown: {
    backgroundColor: DROPDOWN_BACKGROUND_OVERLAY_COLOR,
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing[2],
  },
  menuIcon: {
    color: color.palette.blueyGrey,
  },
  menuIconContainer: {
    minWidth: spacing[6],
  },
  menuText: {
    fontSize: typography.fontSize.small,
  },
  selectedShowDetailsTab: {
    fontSize: typography.fontSize.small,
  },
  selectedShowDetailsTabContainer: {
    alignItems: isIOS ? 'center' : 'flex-start',
    justifyContent: 'center',
  },
})

const adjustFrame = (style: ViewStyle) => {
  style.width = '100%'
  style.left = 0
  return style
}

const standardMenuItems = [
  {
    title: 'Overview',
    route: 'showDetails:overview',
    icon: { pack: 'material-community', name: 'monitor-dashboard' },
  },
  {
    title: 'Tasks',
    route: 'showDetails:tasks',
    icon: { pack: 'simple-line', name: 'check' },
  },
  {
    title: 'Schedule',
    route: 'showDetails:schedule',
    icon: { pack: 'calendar', name: 'calendar' },
  },
  {
    title: 'Travel',
    route: 'showDetails:travel',
    icon: { pack: 'font-awesome', name: 'plane' },
  },
  {
    title: 'Expenses',
    route: 'showDetails:expenses',
    icon: { pack: 'font-awesome', name: 'dollar' },
  },
  {
    title: 'Team',
    route: 'showDetails:team',
    icon: { pack: 'font-awesome', name: 'user' },
  },
]

const extraMenuItems = [
  {
    title: 'Overview',
    route: 'showDetails:overview',
    icon: { pack: 'material-community', name: 'monitor-dashboard' },
  },
  {
    title: 'ROI',
    route: 'showDetails:roi',
    icon: { pack: 'material', name: 'pie-chart' },
  },
  {
    title: 'Tasks',
    route: 'showDetails:tasks',
    icon: { pack: 'simple-line', name: 'check' },
  },
  {
    title: 'Schedule',
    route: 'showDetails:schedule',
    icon: { pack: 'calendar', name: 'calendar' },
  },
  {
    title: 'Travel',
    route: 'showDetails:travel',
    icon: { pack: 'font-awesome', name: 'plane' },
  },
  {
    title: 'Expenses',
    route: 'showDetails:expenses',
    icon: { pack: 'font-awesome', name: 'dollar' },
  },
  {
    title: 'Team',
    route: 'showDetails:team',
    icon: { pack: 'font-awesome', name: 'user' },
  },
  {
    title: 'Resources',
    route: 'showDetails:resources',
    icon: { pack: 'entypo', name: 'folder' },
  },
]

export const HeaderDropdownMenu = observer(() => {
  const {
    navigationStore: { navigateTo },
    showStore: {
      selectedShowDetailsTab,
      setSelectedShowDetailsTab,
      showDetails,
    },
    userStore: { isInternalUser },
  } = useStores()

  const onSelect = (_, rowData) => {
    setSelectedShowDetailsTab(rowData)
    navigateTo({ routeName: rowData.route })
  }

  const renderRow = rowData => {
    return (
      <View
        style={{
          ...styles.menu,
          backgroundColor:
            rowData.title === selectedShowDetailsTab.title
              ? color.palette.paleGrey
              : color.palette.white,
        }}
      >
        <View style={styles.menuIconContainer}>
          <FontIcon
            style={styles.menuIcon}
            pack={rowData.icon.pack}
            name={rowData.icon.name}
            size={typography.fontSize.regular}
          />
        </View>
        <Text style={styles.menuText}>{rowData.title}</Text>
      </View>
    )
  }

  return (
    <DropdownMenu
      options={isInternalUser ? extraMenuItems : standardMenuItems}
      renderRow={renderRow}
      dropdownStyle={styles.dropdown}
      adjustFrame={adjustFrame}
      renderSeparator={() => null}
      onSelect={onSelect}
    >
      <View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{showDetails.showName}</Text>
          <FontIcon
            style={styles.buttonIcon}
            pack="evil"
            name="chevron-down"
            size={24}
          />
        </View>
        <View style={styles.selectedShowDetailsTabContainer}>
          <Text style={styles.selectedShowDetailsTab}>
            {selectedShowDetailsTab.title}
          </Text>
        </View>
      </View>
    </DropdownMenu>
  )
})
