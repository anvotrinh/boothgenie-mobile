import React from 'react'
import { StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native'
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  GiftedChatProps,
} from 'react-native-gifted-chat'
import { FontIcon } from '..'
import { displayTime, isDifferentDay } from '../../utils/date'
import { spacing, typography, color } from '../../theme'

interface Styles {
  chatMessageInfo: TextStyle
  textInputStyle: TextStyle
  senderStyle: ViewStyle
  currentUserMessageStyle: TextStyle
  inputToolBar: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  chatMessageInfo: {
    color: color.palette.blacktwo,
    fontSize: typography.fontSize.small,
    paddingVertical: spacing[2],
  },
  currentUserMessageStyle: { textAlign: 'right' },
  inputToolBar: {
    backgroundColor: color.palette.whiteFour,
    paddingVertical: spacing[0],
  },
  senderStyle: {
    margin: spacing[3],
  },
  textInputStyle: {
    borderColor: color.palette.whiteTwo,
    borderRadius: spacing[2],
    borderWidth: 1,
    height: 50,
    margin: 0,
    paddingLeft: spacing[3],
    paddingTop: spacing[2],
  },
})

const messageWrapperStyle = {
  left: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  right: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
}

const renderBubble = props => {
  const { currentMessage, user, previousMessage } = props
  const isCurrentUser = currentMessage.user._id === user._id
  const messageName = isCurrentUser ? '' : currentMessage.user.name
  const messageTime = displayTime(currentMessage.createdAt)
  const isShowInfo =
    previousMessage?.user?._id !== currentMessage?.user._id ||
    isDifferentDay(previousMessage?.createdAt, currentMessage?.createdAt)

  return (
    <View>
      <View>
        {isShowInfo && (
          <Text
            style={[
              styles.chatMessageInfo,
              isCurrentUser ? styles.currentUserMessageStyle : {},
            ]}
          >{`${messageName ? messageName + ',' : ''} ${messageTime}`}</Text>
        )}
      </View>
      <Bubble {...props} wrapperStyle={messageWrapperStyle} />
    </View>
  )
}

const renderInputToolbar = inputToolbarProps => {
  return (
    <InputToolbar {...inputToolbarProps} containerStyle={styles.inputToolBar} />
  )
}

const renderSend = props => {
  return (
    <Send {...props} containerStyle={{}}>
      <View style={styles.senderStyle}>
        <FontIcon
          color={
            props.text?.trim().length > 0
              ? color.palette.clearBlue
              : color.palette.lightBlueGrey
          }
          name="md-send"
          pack="ion"
          size={24}
        />
      </View>
    </Send>
  )
}

type ChatViewProps = GiftedChatProps

export const ChatView = (props: ChatViewProps) => {
  return (
    <GiftedChat
      alwaysShowSend
      inverted={true}
      bottomOffset={0}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderTime={() => null}
      renderInputToolbar={renderInputToolbar}
      textInputStyle={styles.textInputStyle}
      keyboardShouldPersistTaps={'never'}
      {...props}
    />
  )
}
