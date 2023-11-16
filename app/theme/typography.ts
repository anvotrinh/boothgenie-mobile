import { Platform } from 'react-native'

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export const typography = {
  fontFamily: {
    primary: Platform.select({ ios: 'Inter', android: 'Inter' }),
    secondary: Platform.select({ ios: 'Inter', android: 'Inter' }),
  },
  fontSize: {
    tiny: 10,
    small: 12,
    regular: 14,
    medium: 18,
    navHeadingMain: 20,
    navHeadingChild: 16,
    h1: 34,
    h3: 16,
  },
  fontWeight: {
    regular: '400' as FontWeight,
    medium: '500' as FontWeight,
    semiBold: '600' as FontWeight,
    bold: '700' as FontWeight,
  },
}
