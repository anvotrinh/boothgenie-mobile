import * as React from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { FontIcon, Button } from '../index'
import { color } from '../../theme'

interface Styles {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginLeft: 5,
    marginRight: 5,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
})

interface TaskCheckButtonProps {
  isChecked: boolean
  onPress?: () => void
}

export const TaskCheckButton = observer(
  ({ isChecked, onPress }: TaskCheckButtonProps) => {
    const CheckIcon = (style: TextStyle) => {
      if (style.tintColor) delete style.tintColor
      const iconColor = isChecked
        ? color.palette.mediumGreen
        : color.palette.blueyGrey
      return (
        <FontIcon
          color={iconColor}
          name="check-circle"
          size={20}
          style={style}
        />
      )
    }

    return (
      <Button
        appearance="ghost"
        style={styles.container}
        icon={CheckIcon}
        onPress={onPress}
      />
    )
  }
)
