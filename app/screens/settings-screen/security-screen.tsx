import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
  TextStyle,
  ScrollView,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'
import { HOST_URL, CAPTCHA_SITE_KEY } from 'react-native-dotenv'

import {
  Button,
  Input,
  Spinner,
  FormRow,
  Recaptcha,
  Text,
} from '../../components'
import { useStores } from '../../models/root-store'
import { color, spacing } from '../../theme'

interface Styles {
  screen: ViewStyle
  form: ViewStyle
  submitBtn: ViewStyle
  captchaErrorContainer: ViewStyle
  errorMessage: TextStyle
}

const styles = StyleSheet.create<Styles>({
  captchaErrorContainer: {
    alignItems: 'center',
  },
  errorMessage: {
    color: color.palette.red,
  },
  form: {
    backgroundColor: color.palette.white,
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: spacing[4],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
    paddingTop: 10,
  },
  submitBtn: {
    marginTop: spacing[5],
  },
})

interface FormValues {
  existingPassword: string
  newPassword: string
  confirmPassword: string
  captcha: string
}

const validationSchema = yup.object().shape({
  existingPassword: yup
    .string()
    .label('Existing Password')
    .required(),
  newPassword: yup
    .string()
    .label('New Password')
    .required()
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: yup
    .string()
    .label('Confirm Password')
    .required()
    .test('passwords-match', 'Passwords do not match', function(value: string) {
      return this.parent.newPassword === value
    }),
  captcha: yup.string().required('Invalid captcha.Please try again'),
})

export type SettingsSecurityScreenProps = NavigationScreenProps<{}>

export const SettingsSecurityScreen: React.FunctionComponent<SettingsSecurityScreenProps> = observer(
  () => {
    const {
      userStore: { updatePassword },
    } = useStores()
    const [loading, setLoading] = React.useState(false)

    const onLoadCaptcha = (syntheticEvent: React.SyntheticEvent) => {
      setLoading(syntheticEvent.nativeEvent.loading)
    }

    const onSubmit = async (values: FormValues, { resetForm }) => {
      const isSuccess = await updatePassword({
        password: values.newPassword,
        oldPassword: values.existingPassword,
        captcha: values.captcha,
      })
      if (isSuccess) {
        resetForm()
      }
    }

    const formikForm = ({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      touched,
      values,
    }) => (
      <View style={styles.form}>
        <FormRow
          label="Existing Password"
          error={touched.existingPassword && errors.existingPassword}
        >
          <Input
            placeholder="Enter Password"
            size="large"
            secureTextEntry
            value={values.existingPassword}
            onChangeText={handleChange('existingPassword')}
            onBlur={handleBlur('existingPassword')}
          />
        </FormRow>
        <FormRow
          label="New Password"
          error={touched.newPassword && errors.newPassword}
        >
          <Input
            placeholder="Enter Password"
            size="large"
            secureTextEntry
            value={values.newPassword}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
          />
        </FormRow>
        <FormRow
          label="Repeat New Password"
          error={touched.confirmPassword && errors.confirmPassword}
        >
          <Input
            placeholder="Enter Password"
            size="large"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
          />
        </FormRow>
        <Button
          status="primary"
          size="large"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={styles.submitBtn}
        >
          Update Password
        </Button>
        <View style={styles.captchaErrorContainer}>
          <Text style={styles.errorMessage}>{errors.captcha || ' '}</Text>
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
      </View>
    )

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={styles.screen}
          testID="SettingsSecurityScreen"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              existingPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formikForm}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
)
