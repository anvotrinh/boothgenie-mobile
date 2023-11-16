import * as React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  ListProps,
  Text,
  Empty,
  DraftjsView,
  CheckIcon,
} from '../../../components'
import { Lesson, Question as QuestionData } from '../../../services/api'
import { color, typography, spacing } from '../../../theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Question } from './question'
import WebView from 'react-native-webview'
import { useStores } from '../../../models/root-store'

interface Styles {
  emptyContainerStyle: ViewStyle
  list: ViewStyle
  section: ViewStyle
  lesson: ViewStyle
  selectedLesson: ViewStyle
  nameWrapper: ViewStyle
  lessonNumber: TextStyle
  name: TextStyle
  details: ViewStyle
  detailsTitle: TextStyle
  video: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  details: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    paddingBottom: spacing[3],
    paddingHorizontal: spacing[4],
  },
  detailsTitle: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.navHeadingChild,
    fontWeight: typography.fontWeight.semiBold,
    marginVertical: spacing[3],
  },
  emptyContainerStyle: {
    marginTop: spacing[7],
  },
  lesson: {
    alignItems: 'center',
    borderColor: color.palette.white,
    borderLeftWidth: 4,
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
  },
  lessonNumber: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  list: {
    paddingBottom: 10,
  },
  name: {
    color: color.heading,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semiBold,
  },
  nameWrapper: {
    flex: 1,
  },
  section: {
    backgroundColor: color.palette.white,
    borderColor: color.palette.mystic,
    borderWidth: 1,
    elevation: 1,
    marginTop: 10,
    shadowColor: color.palette.solidBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  selectedLesson: {
    backgroundColor: color.palette.paleGrey,
    borderColor: color.palette.deepSkyBlue,
  },
  video: {
    height: 250,
    marginBottom: spacing[2],
  },
})

interface LessonItemProps {
  item: Lesson
  index?: number
  onItemPress: (item: Lesson) => void
  isSelected: boolean
  isCompleted: boolean
}

interface LessonListProps extends ListProps {
  lessons: Lesson[]
  questions: QuestionData[]
  completedLessons: string[]
}

const quiz: Lesson = {
  _id: 'quiz',
  name: 'Quiz',
  content: '',
  documents: [],
}

export const LessonItem = observer(
  ({ item, index, onItemPress, isSelected, isCompleted }: LessonItemProps) => {
    const onPress = () => {
      if (onItemPress) {
        onItemPress(item)
      }
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.lesson, isSelected && styles.selectedLesson]}
      >
        <CheckIcon isChecked={isCompleted} />
        <View style={styles.nameWrapper}>
          {typeof index === 'number' && (
            <Text style={styles.lessonNumber}>{`Lesson ${index + 1}`}</Text>
          )}
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
)

export const LessonList = observer(
  ({ lessons, questions, completedLessons }: LessonListProps) => {
    const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(
      null
    )

    const {
      trainingStore: { completeTrainingLesson, trainingDetails },
    } = useStores()

    const onItemPress = (lesson: Lesson) => {
      setSelectedLesson(lesson)
      if (!completedLessons.includes(lesson._id)) {
        completeTrainingLesson(lesson._id)
      }
    }

    const isCompletedAllLesson = () => {
      return lessons.every(lesson => completedLessons.includes(lesson._id))
    }

    return (
      <>
        {selectedLesson &&
          selectedLesson._id !== quiz._id &&
          selectedLesson.documents.map((document, index) => {
            if (!document.provider.youtube) {
              return null
            }
            return (
              <WebView
                key={index}
                originWhitelist={['*']}
                style={styles.video}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
                source={{
                  uri: `https://www.youtube.com/embed/${document.provider.youtube}`,
                }}
              />
            )
          })}
        {selectedLesson && selectedLesson._id === quiz._id && (
          <Question containerStyle={styles.section} questions={questions} />
        )}
        <View style={[styles.list, styles.section]}>
          {lessons.map((lesson, index) => (
            <LessonItem
              key={index}
              item={lesson}
              isSelected={
                selectedLesson ? lesson._id === selectedLesson._id : false
              }
              isCompleted={completedLessons.includes(lesson._id)}
              index={index}
              onItemPress={onItemPress}
            />
          ))}
          {isCompletedAllLesson() && questions.length > 0 && (
            <LessonItem
              item={quiz}
              isSelected={
                selectedLesson ? quiz._id === selectedLesson._id : false
              }
              isCompleted={trainingDetails.status === 'COMPLETED'}
              onItemPress={onItemPress}
            />
          )}
          {lessons.length === 0 && (
            <Empty
              description="No lessons found."
              containerStyle={styles.emptyContainerStyle}
            />
          )}
        </View>
        {selectedLesson && selectedLesson._id !== quiz._id && (
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>{selectedLesson.name}</Text>
            <DraftjsView content={selectedLesson.content} />
          </View>
        )}
      </>
    )
  }
)
