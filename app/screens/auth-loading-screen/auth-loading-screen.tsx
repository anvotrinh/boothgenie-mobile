import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { NavigationScreenProp } from 'react-navigation'
import { useStores } from '../../models/root-store'

export type AuthLoadingScreenProps = NavigationScreenProp<{}>

export const AuthLoadingScreen: React.FunctionComponent<AuthLoadingScreenProps> = observer(
  () => {
    const {
      authStore: { authenticated },
      navigationStore: { navigateTo },
    } = useStores()

    React.useEffect(() => {
      navigateTo({
        routeName: authenticated ? 'App' : 'Auth',
      })
    }, [])

    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
)
