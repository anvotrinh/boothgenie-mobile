import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Show } from '../../../../services/api'
import { Map, Marker, Text } from '../../../../components'
import { color, spacing, typography } from '../../../../theme'
import { getZoomLevel } from '../../../../utils/map'

const zoomLevel = getZoomLevel()

interface Styles {
  address: TextStyle
  h3: ViewStyle
  info: ViewStyle
  map: ViewStyle
  placeName: TextStyle
}

const styles = StyleSheet.create<Styles>({
  address: {
    fontSize: typography.fontSize.tiny,
    lineHeight: spacing[4],
  },
  h3: {
    marginBottom: spacing[4],
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  map: {
    height: 200,
  },
  placeName: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },
})

interface Props {
  showDetails: Show
}

export const LocationSection = observer(({ showDetails }: Props) => {
  const {
    location: {
      name,
      vicinity,
      geometry: {
        location: { lat, lng },
      },
    },
  } = showDetails

  const marker = {
    title: name,
    description: vicinity,
    coordinate: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: zoomLevel.latitudeDelta,
      longitudeDelta: zoomLevel.longitudeDelta,
    },
  }

  return (
    <View>
      <Text style={styles.h3} category="h3">
        Location
      </Text>
      <Map
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: zoomLevel.latitudeDelta,
          longitudeDelta: zoomLevel.longitudeDelta,
        }}
      >
        <Marker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      </Map>
      <View style={styles.info}>
        <Text style={styles.placeName}>{name}</Text>
        <Text style={styles.address}>{vicinity}</Text>
      </View>
    </View>
  )
})
