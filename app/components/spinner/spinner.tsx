import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import {
  Spinner as SpinnerDefault,
  SpinnerProps as SpinnerPropsDefault,
} from '@ui-kitten/components'
import { color } from '../../theme'

interface Styles {
  overlayContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  overlayContainer: {
    alignItems: 'center',
    backgroundColor: color.palette.transparent,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

interface SpinnerProps extends SpinnerPropsDefault {
  type?: 'normal' | 'overlay'
}

export const Spinner = ({ type = 'overlay', ...rest }: SpinnerProps) => {
  switch (type) {
    case 'overlay':
      return (
        <View style={styles.overlayContainer}>
          <SpinnerDefault {...rest} />
        </View>
      )
    case 'normal':
      return <SpinnerDefault {...rest} />
  }
}
