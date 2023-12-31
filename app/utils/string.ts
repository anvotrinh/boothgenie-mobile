import _startCase from 'lodash/startCase'

export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export const startCase = _startCase
