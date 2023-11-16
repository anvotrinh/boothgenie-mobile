import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Button, Input, Select, Spinner, FormRow } from '../../../../components'
import { useStores } from '../../../../models/root-store'
import { color, spacing } from '../../../../theme'

interface Styles {
  screen: ViewStyle
  form: ViewStyle
  submitBtn: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  form: {
    backgroundColor: color.palette.white,
    paddingBottom: 20,
    paddingHorizontal: spacing[4],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  submitBtn: {
    marginTop: 40,
  },
})

interface Role {
  id: string
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  role: Role
}

const validationSchema = yup.object().shape({
  firstName: yup.string().label('First Name'),
  lastName: yup.string().label('Last Name'),
  email: yup
    .string()
    .label('Email Address')
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  role: yup
    .object()
    .shape({
      id: yup.string().required(),
      text: yup.string().required(),
    })
    .label('Role')
    .nullable()
    .required('Please select role'),
})

const roleSelectData = [
  { id: 'manager', text: 'Event Manager' },
  { id: 'member', text: 'Staffer' },
]

export type AddMemberScreenProps = NavigationScreenProps<{}>

export const AddMemberScreen: React.FunctionComponent<AddMemberScreenProps> = observer(
  () => {
    const {
      showStore: { showDetails, inviteUserToShow },
    } = useStores()

    const onSubmit = async (values: FormValues) => {
      const userBody = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role.id,
      }
      await inviteUserToShow(showDetails._id, userBody)
    }

    const formikForm = ({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      touched,
      values,
    }) => (
      <View style={styles.form}>
        <FormRow
          label="First Name"
          error={touched.firstName && errors.firstName}
        >
          <Input
            placeholder="Enter Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
          />
        </FormRow>
        <FormRow label="Last Name" error={touched.lastName && errors.lastName}>
          <Input
            placeholder="Enter Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
          />
        </FormRow>
        <FormRow label="Email Address" error={touched.email && errors.email}>
          <Input
            autoCapitalize="none"
            placeholder="Enter Email"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
        </FormRow>
        <FormRow label="Role" error={touched.role && errors.role}>
          <Select
            data={roleSelectData}
            selectedOption={values.role}
            onPress={Keyboard.dismiss}
            onSelect={option => setFieldValue('role', option)}
            placeholder="Select Role"
          />
        </FormRow>
        <Button
          status="primary"
          size="large"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={styles.submitBtn}
        >
          Add User
        </Button>
        {isSubmitting && <Spinner />}
      </View>
    )

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.screen} testID="AddMemberScreen">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              role: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formikForm}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    )
  }
)
