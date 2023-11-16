import * as React from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal as RNModal,
} from 'react-native'
import { Button, FontIcon } from '../index'
import { spacing, color } from '../../theme'

interface Styles {
  container: ViewStyle
  closeBtn: ViewStyle
  content: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  closeBtn: {
    alignSelf: 'flex-end',
  },
  container: {
    backgroundColor: color.palette.mineShaft,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[5],
  },
  content: {
    backgroundColor: color.palette.white,
    borderRadius: spacing[1],
    padding: spacing[4],
  },
})

export interface ModalProps {
  children?: React.ReactNode
  isVisible: boolean
  onClose?: () => void
}

const CloseIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon pack="ant" color={color.palette.hitGrey} name="close" size={24} />
  )
}

export const Modal = ({ isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) {
    return null
  }
  const onClosePress = () => {
    if (onClose) {
      onClose()
    }
  }
  return (
    <RNModal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Button
            onPress={onClosePress}
            style={styles.closeBtn}
            icon={CloseIcon}
            appearance="ghost"
          />
          {children}
        </View>
      </View>
    </RNModal>
  )
}
