import * as React from 'react'
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { GOOGLE_WEB_CLIENT_ID } from 'react-native-dotenv'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import {
  Button,
  Input,
  Link,
  Screen,
  showMessage,
  Spinner,
  Text,
} from '../../components'
import { GoogleLoginButton } from './google-login-button'
import { color } from '../../theme'
import { useStores } from '../../models/root-store'
import { LoginByEmailRequest, LoginByGoogleRequest } from '../../services/api'

interface Styles {
  button: ViewStyle
  buttonContainer: ViewStyle
  errorMessage: TextStyle
  form: ViewStyle
  headingContainer: ViewStyle
  input: ViewStyle
  inputContainer: ViewStyle
  link: TextStyle
  linkContainer: ViewStyle
  screen: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  button: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  errorMessage: {
    color: color.palette.red,
  },
  form: {
    flex: 1,
  },
  headingContainer: {
    marginBottom: 30,
    marginTop: 70,
  },
  input: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
  },
  linkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
  password: yup
    .string()
    .label('Password')
    .required()
    .min(8, 'Password must have at least 8 characters'),
})

GoogleSignin.configure({
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '1:666337367036:ios:0bd16a0cc2942855249879'
})

export type LoginScreenProps = NavigationScreenProp<{}>

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = observer(
  () => {
    const {
      authStore: { loginByEmail, loginByGoogle, loginByGoogleLoading },
      navigationStore: { navigateTo },
    } = useStores()
    const goToResetPassword = () => navigateTo({ routeName: 'resetPassword' })
    const onSubmit = async (values: LoginByEmailRequest) => {
      await loginByEmail(values)
    }

    const onGoogleLogin = async () => {
      try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        if (userInfo) {
          const googleTokenID = userInfo.idToken || ''
          const data: LoginByGoogleRequest = { googleTokenID }
          loginByGoogle(data)
        }
      } catch (error) {
        let message = ''
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          message = 'Login cancelled'
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          message = 'Login is in progress'
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          message = 'Play service is not available or outdated'
        } else {
          // some other error happened
          console.log('error', error)
          message = 'Something went wrong'
        }
        showMessage({
          type: 'danger',
          message,
        })
      }
    }

    return (
      <Screen style={styles.screen} testID="LoginScreen">
        <Formik
          initialValues={{ email: '', password: '' }}
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
                <View style={styles.headingContainer}>
                  <Text category="h1">Welcome to</Text>
                  <Text category="h1">Booth Genie</Text>
                </View>
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
                  <View style={styles.input}>
                    <Input
                      placeholder="Password"
                      size="large"
                      secureTextEntry
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <Text style={styles.errorMessage}>
                      {touched.password ? errors.password : ' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.linkContainer}>
                  <Link textStyle={styles.link} onPress={goToResetPassword}>
                    Forgot your password?
                  </Link>
                </View>
              </View>
              <View style={styles.button}>
                <Button
                  status="primary"
                  size="large"
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                >
                  Login
                </Button>
              </View>
              {(isSubmitting || loginByGoogleLoading) && <Spinner />}
            </>
          )}
        </Formik>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GoogleLoginButton
              onPress={onGoogleLogin}
              disabled={loginByGoogleLoading}
            />
          </View>
        </View>
      </Screen>
    )
  }
)
