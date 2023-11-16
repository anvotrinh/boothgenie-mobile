import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Text } from '../../../components'
import { useStores } from '../../../models/root-store'
import { navigationStyles } from '../../navigation-styles'

export const TrainingTitle = observer(() => {
  const {
    trainingStore: { trainingDetails },
  } = useStores()

  return (
    <Text style={navigationStyles.headerTitleChildStyle}>
      {trainingDetails.name}
    </Text>
  )
})
