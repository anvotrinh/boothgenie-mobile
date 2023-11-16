import * as React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { HOST_URL, CAPTCHA_SITE_KEY } from 'react-native-dotenv'
import { Button, Input, Recaptcha, Screen, Spinner } from '../../components'
import { color } from '../../theme'
import { useStores } from '../../models/root-store'
import { RequestResetPasswordRequest } from '../../services/api'

interface Styles {
  button: ViewStyle
  captchaErrorContainer: ViewStyle
  errorMessage: TextStyle
  form: ViewStyle
  input: ViewStyle
  inputContainer: ViewStyle
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  button: {
    marginBottom: 20,
  },
  captchaErrorContainer: {
    alignItems: 'center',
  },
  errorMessage: {
    color: color.palette.red,
  },
  form: {
    flex: 1,
    marginTop: 60,
  },
  input: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  screen: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Please enter a registered email')
    .required('Please enter a registered email'),
  captcha: yup.string().required('Invalid captcha.Please try again'),
})

export type ResetPasswordScreenProps = NavigationScreenProp<{}>

export const ResetPasswordScreen: React.FunctionComponent<ResetPasswordScreenProps> = observer(
  () => {
    const {
      userStore: { requestResetPassword },
    } = useStores()
    const [loading, setLoading] = React.useState(false)

    const onLoadCaptcha = (syntheticEvent: React.SyntheticEvent) => {
      setLoading(syntheticEvent.nativeEvent.loading)
    }

    const onSubmit = async (values: RequestResetPasswordRequest) => {
      await requestResetPassword(values)
    }

    return (
      <Screen style={styles.screen} testID="ResetPasswordScreen">
        <Formik
          initialValues={{ email: '', captcha: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <>
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Input
                      autoCapitalize="none"
                      placeholder="Email"
                      keyboardType="email-address"
                      size="large"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    <Text style={styles.errorMessage}>
                      {touched.email ? errors.email : ' '}
                    </Text>
                  </View>
                  <View style={styles.button}>
                    <Button
                      status="primary"
                      size="large"
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Reset My Password
                    </Button>
                  </View>
                  <View style={styles.captchaErrorContainer}>
                    <Text style={styles.errorMessage}>
                      {errors.captcha || ' '}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Recaptcha
                  siteKey={CAPTCHA_SITE_KEY}
                  url={HOST_URL}
                  onCheck={handleChange('captcha')}
                  onLoadStart={onLoadCaptcha}
                  onLoadEnd={onLoadCaptcha}
                  onShouldStartLoadWithRequest={request => {
                    return (
                      request.url.startsWith(HOST_URL) ||
                      request.url.startsWith('https://www.google.com')
                    )
                  }}
                />
              </View>
              {(loading || isSubmitting) && <Spinner />}
            </>
          )}
        </Formik>
      </Screen>
    )
  }
)
