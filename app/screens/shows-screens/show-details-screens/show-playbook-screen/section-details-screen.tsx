import * as React from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color, typography, spacing } from '../../../../theme'
import { Text, DraftjsView } from '../../../../components'
import { Section } from '../../../../services/api'
import { ScrollView } from 'react-native-gesture-handler'

interface Styles {
  screen: ViewStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.navHeadingMain,
    fontWeight: typography.fontWeight.semiBold,
    marginVertical: spacing[4],
  },
})

export type ShowSectionDetailsScreenProps = NavigationScreenProps<{}>

export const ShowSectionDetailsScreen: React.FunctionComponent<ShowSectionDetailsScreenProps> = observer(
  (props: ShowSectionDetailsScreenProps) => {
    const section: Section = props.navigation.getParam('section' as never)

    return (
      <ScrollView style={styles.screen} testID="ShowSectionDetailsScreen">
        <Text style={styles.title}>{section.name}</Text>
        <DraftjsView content={section.content} />
      </ScrollView>
    )
  }
)
