import * as React from 'react'
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Text } from '../index'
import { spacing, color, typography } from '../../theme'

interface Styles {
  formRow: ViewStyle
  formRowLabel: TextStyle
  errorMessage: TextStyle
}

const styles = StyleSheet.create<Styles>({
  errorMessage: {
    color: color.palette.red,
  },
  formRow: {
    marginTop: spacing[3],
  },
  formRowLabel: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing[1],
  },
})

export interface FormRowProps {
  children?: React.ReactNode
  label: string
  error: string
}

export const FormRow = ({ label, error, children }: FormRowProps) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.formRowLabel}>{label}</Text>
      {children}
      <Text style={styles.errorMessage}>{error || ' '}</Text>
    </View>
  )
}
