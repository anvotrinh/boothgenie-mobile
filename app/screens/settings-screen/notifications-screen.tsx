import * as React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'

import { Button } from '../../components'
import { useStores } from '../../models/root-store'
import { color, spacing } from '../../theme'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: 10,
  },
})

export type SettingsNotificationsScreenProps = NavigationScreenProps<{}>

export const SettingsNotificationsScreen: React.FunctionComponent<SettingsNotificationsScreenProps> = observer(
  () => {
    const {
      authStore: { logout },
    } = useStores()

    // TODO: REMOVE TEMPORARY LOGOUT
    return (
      <View style={styles.screen} testID="SettingsNotificationsScreen">
        <Button status="primary" size="large" onPress={logout}>
          Logout
        </Button>
      </View>
    )
  }
)
