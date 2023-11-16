import * as React from 'react'
import {
  Datepicker as DatepickerDefault,
  DatepickerProps as DatepickerPropsDefault,
} from '@ui-kitten/components'

export type DatepickerProps = DatepickerPropsDefault

export const Datepicker = (props: DatepickerProps) => {
  return <DatepickerDefault {...props} />
}
