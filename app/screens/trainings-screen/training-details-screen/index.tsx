import * as React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { color } from '../../../theme'
import { LessonList } from './lesson-list'
import { Training } from '../../../services/api'
import { ScrollView } from 'react-native-gesture-handler'
import { useStores } from '../../../models/root-store'

interface Styles {
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
})

export type TrainingDetailsProps = NavigationScreenProp<{}>

export const TrainingDetailsScreen: React.FunctionComponent<TrainingDetailsProps> = observer(
  (props: TrainingDetailsProps) => {
    const training: Training = props.navigation.getParam('training' as never)

    const {
      userStore: { userProfile },
    } = useStores()

    React.useEffect(() => {
      props.navigation.setParams({ training })
    }, [])

    let completedLessons: string[] = []
    const userID = userProfile._id
    const trainingUser = training.users.find(u => u.userID._id === userID)
    if (trainingUser) {
      completedLessons = trainingUser.completedLessons
    }

    return (
      <ScrollView style={styles.screen} testID="TrainingDetailsScreen">
        <LessonList
          lessons={training.lessons}
          questions={training.questionIDs}
          completedLessons={completedLessons}
        />
      </ScrollView>
    )
  }
)
