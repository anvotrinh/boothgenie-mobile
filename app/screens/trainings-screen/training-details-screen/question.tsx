import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text, Modal, Button, showMessage } from '../../../components'
import { Question as QuestionData } from '../../../services/api'
import { color, spacing, typography } from '../../../theme'
import { useStores } from '../../../models/root-store'

interface Styles {
  question: ViewStyle
  titleWrapper: ViewStyle
  optionsWrapper: ViewStyle
  option: ViewStyle
  selectedOption: ViewStyle
  optionText: TextStyle
  title: TextStyle
  questionText: TextStyle
  modalContent: ViewStyle
  modalTitle: TextStyle
  modalDescription: TextStyle
  modalButton: ViewStyle
  submitAnswerBtnWrapper: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  modalButton: {
    marginTop: spacing[6],
    paddingHorizontal: spacing[5],
  },
  modalContent: {
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[6],
  },
  modalDescription: {
    color: color.palette.nevada,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.regular,
    marginTop: spacing[5],
    textAlign: 'center',
  },
  modalTitle: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.navHeadingMain,
    fontWeight: typography.fontWeight.semiBold,
  },
  option: {
    borderColor: color.palette.whiteThree,
    borderWidth: 1,
    marginBottom: spacing[2],
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
  },
  optionText: {
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.medium,
  },
  optionsWrapper: {
    paddingHorizontal: 20,
    paddingTop: spacing[2],
  },
  question: {
    paddingVertical: spacing[4],
  },
  questionText: {
    color: color.palette.nevada,
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.regular,
    marginTop: spacing[1],
  },
  selectedOption: {
    backgroundColor: color.palette.malachite,
  },
  submitAnswerBtnWrapper: {
    alignItems: 'center',
    marginTop: spacing[5],
  },
  title: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.regular,
    fontWeight: typography.fontWeight.semiBold,
  },
  titleWrapper: {
    backgroundColor: color.palette.whiteFour,
    borderColor: color.palette.seashell,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: spacing[5],
  },
})

interface OptionProps {
  text: string
  index: number
  onPress: (index: number) => void
  isSelected: boolean
}

interface QuestionProps {
  questions: QuestionData[]
  containerStyle: ViewStyle
}

export const Option = ({ text, index, onPress, isSelected }: OptionProps) => {
  const handlePress = () => {
    onPress(index)
  }
  const textStyle = {
    ...styles.optionText,
    color: isSelected ? color.palette.white : color.palette.nevada,
  }
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.option, isSelected && styles.selectedOption]}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export const Question = observer(
  ({ questions, containerStyle }: QuestionProps) => {
    const {
      trainingStore: { completeTraining, trainingDetails },
      navigationStore: { goBack },
    } = useStores()

    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<
      number
    >(0)
    const [selectedOptionIndexes, setSelectedOptionIndexes] = React.useState<
      number[]
    >([])
    const [modalAnswerVisible, setModalAnswerVisible] = React.useState<boolean>(
      false
    )
    const [
      modalCompleteTrainingVisible,
      setModalCompleteTrainingVisible,
    ] = React.useState<boolean>(false)

    const questionDetails = questions[currentQuestionIndex]

    const onOptionPress = (index: number) => {
      let newSelectedOptionIndexes: number[] = []
      if (selectedOptionIndexes.includes(index)) {
        newSelectedOptionIndexes = selectedOptionIndexes.filter(
          i => i !== index
        )
      } else if (questionDetails.type === 'MULTI_SELECT') {
        newSelectedOptionIndexes = [...selectedOptionIndexes, index]
      } else if (questionDetails.type === 'MULTIPLE_CHOICE') {
        newSelectedOptionIndexes = [index]
      }
      setSelectedOptionIndexes(newSelectedOptionIndexes)
    }

    const onSubmitAnswerPress = () => {
      const userAnswers = selectedOptionIndexes.slice()
      userAnswers.sort()
      let isCorrect = true
      if (questionDetails.answer.length !== userAnswers.length) {
        isCorrect = false
      }
      for (const i in userAnswers) {
        if (userAnswers[i] !== questionDetails.answer[i]) {
          isCorrect = false
          break
        }
      }
      if (isCorrect) {
        showMessage({
          type: 'success',
          message: 'Correct',
          description: 'Your answer is correct!',
        })
        if (currentQuestionIndex < questions.length - 1) {
          setSelectedOptionIndexes([])
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else if (currentQuestionIndex === questions.length - 1) {
          if (trainingDetails.status !== 'COMPLETED') {
            completeTraining()
          }
          setModalCompleteTrainingVisible(true)
        }
      } else {
        setModalAnswerVisible(true)
      }
    }

    const onTrainingCompletePress = () => {
      setModalCompleteTrainingVisible(false)
      goBack()
    }

    return (
      <View style={[styles.question, containerStyle]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{`Question ${currentQuestionIndex + 1}/${
            questions.length
          }`}</Text>
          {questionDetails && (
            <Text style={styles.questionText}>{questionDetails.title}</Text>
          )}
        </View>
        {questionDetails && (
          <View style={styles.optionsWrapper}>
            {questionDetails.options.map((option: string, index: number) => (
              <Option
                key={index}
                text={option}
                index={index}
                isSelected={selectedOptionIndexes.includes(index)}
                onPress={onOptionPress}
              />
            ))}
          </View>
        )}
        <View style={styles.submitAnswerBtnWrapper}>
          <Button status="primary" size="large" onPress={onSubmitAnswerPress}>
            Submit Answer
          </Button>
        </View>
        <Modal
          isVisible={modalAnswerVisible}
          onClose={() => setModalAnswerVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Incorrect Answer!</Text>
            <Text style={styles.modalDescription}>
              Please try again. Your answer was not correct.
            </Text>
            <Button
              status="primary"
              size="large"
              onPress={() => setModalAnswerVisible(false)}
              style={styles.modalButton}
            >
              Try Again
            </Button>
          </View>
        </Modal>
        <Modal
          isVisible={modalCompleteTrainingVisible}
          onClose={() => setModalCompleteTrainingVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Completed Training!</Text>
            <Text style={styles.modalDescription}></Text>
            <Button
              status="primary"
              size="large"
              onPress={onTrainingCompletePress}
              style={styles.modalButton}
            >
              OK
            </Button>
          </View>
        </Modal>
      </View>
    )
  }
)
