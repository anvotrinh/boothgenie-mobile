import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Text } from '../../components'
import { color } from '../../theme'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    alignItems: 'center',
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
    justifyContent: 'center',
  },
})

export type BlankScreenProps = NavigationScreenProp<{}>

export const BlankScreen: React.FunctionComponent<BlankScreenProps> = observer(
  () => {
    return (
      <View testID="BlankScreen" style={styles.screen}>
        <Text>Blank Screen</Text>
      </View>
    )
  }
)
