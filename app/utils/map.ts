import { Dimensions } from 'react-native'

export const getZoomLevel = () => {
  const { width, height } = Dimensions.get('window')
  const ASPECT_RATIO = width / height
  const LATITUDE_DELTA = 100
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  return {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
}
