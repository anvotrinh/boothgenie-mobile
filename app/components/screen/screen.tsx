import * as React from 'react'
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { ScreenProps } from './screen.props'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { isIOS } from '../../utils/platform'

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIOS ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'default'} />
      <Wrapper style={[preset.inner, style]}>{props.children}</Wrapper>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'default'} />
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
