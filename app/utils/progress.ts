import dayjs from 'dayjs'
import { TaskData } from '../services/api'

export const calcProgress = (taskData: TaskData[]) => {
  const [{ completedTasks, totalCount }] = taskData
  let completedTaskCount = 0
  let totalTaskCount = 0
  if (completedTasks.length > 0) {
    completedTaskCount = completedTasks[0].count
  }
  if (totalCount.length > 0) {
    totalTaskCount = totalCount[0].count
  }
  const progress =
    totalTaskCount === 0 ? 0 : (completedTaskCount / totalTaskCount).toFixed(2)

  return {
    progress: Number(progress),
    completedTaskCount,
    totalTaskCount,
  }
}

export const calcDaysRemaining = (start: string) => {
  const startDate = dayjs(new Date(new Date(start).toDateString()))
  const today = dayjs(new Date(new Date().toDateString()))

  const daysRemaining = startDate.diff(today, 'day', true)

  return daysRemaining <= 0 ? 0 : daysRemaining
}
