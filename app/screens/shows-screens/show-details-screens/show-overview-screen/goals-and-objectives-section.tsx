import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from '../../../../components'
import { spacing, typography } from '../../../../theme'
import { Show } from '../../../../services/api'

interface Styles {
  h3: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Styles>({
  h3: {
    marginBottom: spacing[2],
  },
  text: {
    fontSize: typography.fontSize.small,
  },
})

interface Props {
  showDetails: Show
}

export const GoalsAndObjectivesSection = ({ showDetails }: Props) => {
  const { description } = showDetails
  return (
    <View>
      <Text style={styles.h3} category="h3">
        Goals And Objectives
      </Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}
