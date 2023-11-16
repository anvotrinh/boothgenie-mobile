import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { TaskCheckButton } from '../../../components'
import { Task } from '../../../models/stores'

interface CheckButtonContentProps {
  task: Task
}

const CheckButtonContent = observer(({ task }: CheckButtonContentProps) => {
  const onPress = () => {
    const status = task.status === 'COMPLETED' ? 'INCOMPLETE' : 'COMPLETED'
    task.updateTask({ status })
  }
  return (
    <TaskCheckButton
      isChecked={task.status === 'COMPLETED'}
      onPress={onPress}
    />
  )
})

export const CheckButton = ({ navigation }) => {
  const task: Task = navigation.getParam('task')
  return <CheckButtonContent task={task} />
}
