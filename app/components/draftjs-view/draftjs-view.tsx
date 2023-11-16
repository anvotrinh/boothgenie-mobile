import * as React from 'react'
import { StyleSheet, View, Image, ViewStyle, ImageStyle } from 'react-native'
import getRNDraftJSBlocks from 'react-native-draftjs-render'
import { spacing } from '../../theme'
import { getSizeAsync } from '../../utils/image'

const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

interface Styles {
  container: ViewStyle
  image: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  image: {
    marginVertical: spacing[2],
  },
})

interface EntityRange {
  key: string
}

interface AtomicItem {
  key: string
  entityRanges: EntityRange[]
}

interface EntityData {
  src: string
  alt: string
  width: string
  height: string
  alignment: string
}

interface Entity {
  type: string
  data?: EntityData
}

async function getImageSizeMap(entityMap: Record<string, Entity>) {
  const imageStyleMap = {}
  const promises: Promise<void>[] = []
  for (const key in entityMap) {
    const entity = entityMap[key]
    if (!entity.data || entity.type !== 'IMAGE') {
      continue
    }
    const { width, height, alignment } = entity.data
    const alignImage = alignment || 'center'
    const alignStyle = { alignSelf: alignMap[alignImage] }
    if (width !== 'auto' && height !== 'auto') {
      imageStyleMap[key] = {
        ...alignStyle,
        width: parseInt(width),
        height: parseInt(height),
      }
      continue
    }
    const promise = getSizeAsync(entity.data.src).then(size => {
      imageStyleMap[key] = {
        ...alignStyle,
        ...size,
      }
    })
    promises.push(promise)
  }
  await Promise.all(promises)
  return imageStyleMap
}

function getAtomicHandler(imageStyleMap: Record<string, any>) {
  return function atomicHandler(
    item: AtomicItem,
    entityMap: Record<string, Entity>
  ) {
    const elementList: React.ReactNode[] = []
    for (const entityRange of item.entityRanges) {
      const entity = entityMap[entityRange.key]
      if (!entity.data) {
        continue
      }
      const imageStyle = imageStyleMap[entityRange.key]
      if (entity.type === 'IMAGE' && imageStyle) {
        elementList.push(
          <Image
            key={entityRange.key}
            style={[styles.image, imageStyle]}
            source={{ uri: entity.data.src }}
          />
        )
      }
    }
    if (elementList.length > 0) {
      return <View key={item.key}>{elementList}</View>
    }
    return null
  }
}

export interface DraftjsViewProps {
  content: string
}

export const DraftjsView = ({ content }: DraftjsViewProps) => {
  let contentState
  try {
    contentState = JSON.parse(content)
  } catch (error) {
    contentState = null
  }

  const [imageStyleMap, setImageStyleMap] = React.useState({})

  async function loadImageMap() {
    if (contentState) {
      const imageStyleMapResult = await getImageSizeMap(contentState.entityMap)
      setImageStyleMap(imageStyleMapResult)
    }
  }

  React.useEffect(() => {
    loadImageMap()
  }, [content])

  let blocks = null
  if (contentState) {
    blocks = getRNDraftJSBlocks({
      contentState,
      atomicHandler: getAtomicHandler(imageStyleMap),
    })
  }

  return <View style={styles.container}>{blocks}</View>
}
