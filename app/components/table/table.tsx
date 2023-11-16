import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import {
  Cell,
  CellProps,
  Section,
  Separator,
  TableView,
} from 'react-native-tableview-simple'
import { FontIcon, Text } from '..'
import { color, spacing, typography } from '../../theme'

interface Styles {
  table: ViewStyle
  tableCell: ViewStyle
  tableCellTitle: TextStyle
  tableCellDetail: TextStyle
  tableSectionHeader: ViewStyle
  tableSectionHeaderText: TextStyle
  tableSeparator: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  table: {
    backgroundColor: color.palette.backgroundGrey,
  },
  tableCell: {
    borderWidth: 0,
    paddingVertical: 6,
  },
  tableCellDetail: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 20,
  },
  tableCellTitle: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
    lineHeight: spacing[5],
  },
  tableSectionHeader: {
    backgroundColor: color.palette.backgroundGrey,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[1],
  },
  tableSectionHeaderText: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.tiny,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: spacing[4],
  },
  tableSeparator: {},
})

interface TableProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const Table = ({ style: styleOverride, ...rest }: TableProps) => {
  const style = styleOverride
    ? { ...styles.table, ...styleOverride }
    : styles.table
  return <TableView style={style} {...rest} />
}

const AccessoryView = () => {
  return (
    <FontIcon
      color={color.palette.lightBlueGrey}
      name="chevron-right"
      pack="feather"
      size={20}
    />
  )
}

interface TableCellProps extends CellProps {
  style?: ViewStyle
}

export const TableCell = ({
  style: styleOverride,
  ...rest
}: TableCellProps) => {
  const style = styleOverride
    ? { ...styles.tableCell, ...styleOverride }
    : styles.tableCell
  return (
    <Cell
      contentContainerStyle={style}
      titleTextStyle={styles.tableCellTitle}
      subtitleTextStyle={styles.tableCellDetail}
      cellAccessoryView={<AccessoryView />}
      {...rest}
    />
  )
}

export const TableSectionHeader = ({
  text,
  style: styleOverride,
  textStyle: textStyleOverride,
}: {
  text: string
  textStyle?: TextStyle
  style?: ViewStyle
}) => {
  const style = styleOverride
    ? { ...styles.tableSectionHeader, ...styleOverride }
    : styles.tableSectionHeader
  const textStyle = textStyleOverride
    ? { ...styles.tableSectionHeaderText, ...textStyleOverride }
    : styles.tableSectionHeaderText
  return (
    <View style={style}>
      <Text style={textStyle}>{text}</Text>
    </View>
  )
}

export const TableSection = props => {
  return (
    <Section
      sectionPaddingBottom={0}
      sectionPaddingTop={0}
      sectionTintColor={color.palette.veryLightBlue}
      separatorTintColor={color.palette.veryLightBlue}
      {...props}
    />
  )
}

export const TableSeparator = ({ style: styleOverride, ...rest }) => {
  const style = styleOverride
    ? { ...styles.tableSeparator, ...styleOverride }
    : styles.tableSeparator
  return <Separator style={style} {...rest} />
}
