import { Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'

interface Size {
  width: number
  height: number
}

export interface ImageSource {
  uri: string
}

export function getSizeAsync(uri: string) {
  return new Promise<Size>((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height })
      },
      err => {
        reject(err)
      }
    )
  })
}

export function showImagePickerAsync() {
  return new Promise<ImageSource | null>(resolve => {
    ImagePicker.showImagePicker({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.error) {
        resolve({ uri: response.uri })
        return
      }
      resolve(null)
    })
  })
}
