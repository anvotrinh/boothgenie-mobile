import numeral from 'numeral'

export const FormatSymbols = {
  Currency: '$',
  Percentage: '%',
}

export type Preset = 'number' | 'currency' | 'percentage'

interface FormatOptions {
  preset?: Preset
  pattern?: string
}

export const formatter = (
  value: number | string,
  options: FormatOptions = {}
) => {
  const isInteger = Number.isInteger(value)
  if (options) {
    if (options.preset) {
      switch (options.preset) {
        case 'currency':
          return numeral(value).format(
            isInteger
              ? `${FormatSymbols.Currency}0,0`
              : `${FormatSymbols.Currency}0,00`
          )
        case 'number':
          return numeral(value).format(isInteger ? '0,0' : '0,0.00')
        case 'percentage':
          return numeral(value).format(
            isInteger
              ? `0,0${FormatSymbols.Percentage}`
              : `0,00${FormatSymbols.Percentage}`
          )
      }
    }

    if (options.pattern) {
      return numeral(value).format(options.pattern)
    }
  }

  return numeral(value)
}
