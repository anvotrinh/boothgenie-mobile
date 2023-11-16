import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import merge from 'lodash/merge'
import set from 'lodash/set'

export const clone = cloneDeep

export const getValueFromPath = get
export const setValueWithPath = set

const deepResetRecursion = (o: object) => {
  for (const key in o) {
    if (!Object.prototype.hasOwnProperty.call(o, key)) continue
    const val = o[key]
    switch (typeof val) {
      case 'string':
        o[key] = ''
        break
      case 'number':
        o[key] = 0
        break
      case 'boolean':
        o[key] = false
        break
      case 'object':
        if (val === null) break
        if (val instanceof Array) {
          o[key] = []
          break
        }
        deepResetRecursion(val)
        break
    }
  }
}

export const deepReset = (o: object) => {
  const obj = clone(o)
  deepResetRecursion(obj)
  return obj
}

const deepFormatRecursion = (o: object, formatFn: (val: string) => any) => {
  for (const key in o) {
    if (!Object.prototype.hasOwnProperty.call(o, key)) continue
    const val = o[key]
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'boolean':
        o[key] = formatFn(o[key])
        break
      case 'object':
        if (val === null) break
        if (val instanceof Array) {
          o[key] = []
          break
        }
        deepFormatRecursion(val, formatFn)
        break
    }
  }
}

export const deepFormat = (o: object, formatFn: (val: string) => any) => {
  const obj = clone(o)
  deepFormatRecursion(obj, formatFn)
  return obj
}

export const deepMerge = merge

export const isEmptyObject = (o: object) => {
  return o && Object.entries(o).length === 0 && o.constructor === Object
}
