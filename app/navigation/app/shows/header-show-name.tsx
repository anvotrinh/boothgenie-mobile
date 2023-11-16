import * as React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text } from '../../../components'
import { navigationStyles } from '../../navigation-styles'
import { useStores } from '../../../models/root-store'
import { color } from '../../../theme'

interface Styles {
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  title: {
    color: color.palette.white,
  },
})

export const HeaderShowName = observer(() => {
  const {
    showStore: { showDetails },
  } = useStores()

  return (
    <Text
      style={{
        ...navigationStyles.headerTitleChildStyle,
        ...styles.title,
      }}
    >
      {showDetails.showName}
    </Text>
  )
})
