import dayjs from 'dayjs'

const dayMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
}

const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

interface DateRangeOptions {
  showWeekDay: boolean
}

export const getWeekDay = (value: string) => {
  return value ? dayMap[dayjs(value).day()] : ''
}

export const getDayInMonth = (value: string) => {
  return value ? dayjs(value).date() : ''
}

export const displayDateRange = (
  start: string,
  end: string,
  options: DateRangeOptions = { showWeekDay: false }
) => {
  const parsedStart = dayjs(start)
  const startWeekDay = parsedStart.day()
  const startDate = parsedStart.date()
  const startMonth = parsedStart.month()
  const startYear = parsedStart.year()

  const parsedEnd = dayjs(end)
  const endWeekDay = parsedEnd.day()
  const endDate = parsedEnd.date()
  const endMonth = parsedEnd.month()
  const endYear = parsedEnd.year()

  let dateRange = ''

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      if (startDate === endDate) {
        if (options.showWeekDay) {
          dateRange = `${dayMap[endWeekDay]}, ${endDate} ${monthMap[endMonth]}, ${endYear}`
        } else {
          dateRange = `${endDate} ${monthMap[endMonth]}, ${endYear}`
        }
      } else {
        if (options.showWeekDay) {
          dateRange = `${dayMap[startWeekDay]}, ${startDate} - ${dayMap[endWeekDay]}, ${endDate} ${monthMap[endMonth]}, ${endYear}`
        } else {
          dateRange = `${startDate} - ${endDate} ${monthMap[endMonth]}, ${endYear}`
        }
      }
    } else {
      if (options.showWeekDay) {
        dateRange = `${dayMap[startWeekDay]}, ${startDate} ${monthMap[startMonth]} - ${dayMap[endWeekDay]}, ${endDate} ${monthMap[endMonth]}, ${endYear}`
      } else {
        dateRange = `${startDate} ${monthMap[startMonth]} - ${endDate} ${monthMap[endMonth]}, ${endYear}`
      }
    }
  } else {
    if (options.showWeekDay) {
      dateRange = `${dayMap[startWeekDay]}, ${startDate} ${monthMap[startMonth]}, ${startYear} - ${dayMap[endWeekDay]}, ${endDate} ${monthMap[endMonth]}, ${endYear}`
    } else {
      dateRange = `${startDate} ${monthMap[startMonth]}, ${startYear} - ${endDate} ${monthMap[endMonth]}, ${endYear}`
    }
  }

  return dateRange
}

export const displayDate = (value: string) => {
  const parsedValue = dayjs(value)
  const date = parsedValue.date()
  const month = parsedValue.month()
  return `${monthMap[month]} ${date}`
}

export const displayFullDate = (value: string) => {
  const parsedValue = dayjs(value)
  const date = parsedValue.date()
  const month = parsedValue.month()
  const year = parsedValue.year()
  return `${monthMap[month]} ${date}, ${year}`
}

export const isOverdue = (value: string) => {
  const time = dayjs(value).valueOf()
  const currentTime = dayjs().valueOf()
  return currentTime > time
}

export const displayTime = (value: string) => {
  return value ? dayjs(value).format('hh:mm A') : ''
}

export const displayDayAndDate = (value: string) => {
  if (!value) return ''
  const day = dayMap[dayjs(value).day()]
  const fullDate = displayFullDate(value)
  return `${day}, ${fullDate}`
}

export const displayFlightDate = (value: string) => {
  if (!value) return ''
  const parsedValue = dayjs(value)
  const date = parsedValue.date()
  const month = parsedValue.month()
  const year = parsedValue.year()
  return `${monthMap[month]}. ${date}, ${year} at ${displayTime(value)}`
}

export const isDifferentDay = (value, compareValue) => {
  if (!value || !compareValue) return false
  return Math.abs(dayjs(value).diff(compareValue, 'day')) > 0
}

export const displayChatDate = (value: string) => {
  return isDifferentDay(dayjs(), value)
    ? displayDate(value)
    : displayTime(value)
}
