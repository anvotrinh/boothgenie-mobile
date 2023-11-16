import * as React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { WebView, WebViewProps } from 'react-native-webview'
import { recaptchaHtml } from './config'

interface Styles {
  webView: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  webView: {
    height: 0,
    width: 0,
  },
})

interface Props extends WebViewProps {
  siteKey: string
  url: string
  onCheck: (token: string) => void
}

export const Recaptcha = ({ onCheck, url, siteKey, ...rest }: Props) => {
  let captchaRef = React.useRef(null)
  const recaptchaHtmlWithKey = recaptchaHtml.replace('[SITEKEY]', siteKey)

  React.useEffect(() => {
    return () => captchaRef?.current?.stopLoading()
  }, [])

  return (
    <WebView
      {...rest}
      originWhitelist={['*']}
      style={styles.webView}
      startInLoadingState
      javaScriptEnabled
      source={{ html: recaptchaHtmlWithKey, baseUrl: url }}
      onMessage={event => onCheck(event.nativeEvent.data)}
      ref={ref => {
        captchaRef = ref
      }}
      androidHardwareAccelerationDisabled
    />
  )
}
