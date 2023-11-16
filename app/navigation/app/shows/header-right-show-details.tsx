import * as React from 'react'
import { TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { FontIcon, Button } from '../../../components'
import { useStores } from '../../../models/root-store'
import { color } from '../../../theme'

const AddIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      color={color.palette.lightBlueGrey}
      pack="ant"
      name="pluscircle"
      size={20}
      style={style}
    />
  )
}

export const HeaderRightShowDetails = observer(() => {
  const {
    navigationStore: { navigateTo },
    showStore: { selectedShowDetailsTab },
  } = useStores()
  let onPress
  switch (selectedShowDetailsTab.title) {
    case 'Expenses':
      onPress = () => navigateTo({ routeName: 'addExpense' })
      return <Button appearance="ghost" icon={AddIcon} onPress={onPress} />
    case 'Team':
      onPress = () => navigateTo({ routeName: 'addMember' })
      return <Button appearance="ghost" icon={AddIcon} onPress={onPress} />
    default:
      return null
  }
})
