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

import {
  Button,
  Input,
  Spinner,
  FormRow,
  FontIcon,
  Avatar,
  Text,
} from '../../components'
import { useStores } from '../../models/root-store'
import { color, spacing, typography } from '../../theme'
import { ImageSource, showImagePickerAsync } from '../../utils/image'
import { UpdateProfileRequest } from '../../models/stores'
import { UserRole } from '../../services/api'
const defaultAvatar = require('../../assets/images/avatar/default-avatar.png')

interface Styles {
  screen: ViewStyle
  form: ViewStyle
  submitBtn: ViewStyle
  avatarWrapper: ViewStyle
  uploadText: TextStyle
  uploadBtn: ViewStyle
  role: ViewStyle
  roleText: TextStyle
  roleWrapper: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  avatarWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
  },
  form: {
    backgroundColor: color.palette.white,
    marginTop: 10,
    paddingHorizontal: spacing[4],
  },
  role: {
    alignItems: 'center',
    backgroundColor: color.palette.iceBlue,
    borderColor: color.palette.hitGrey,
    borderWidth: 1,
    marginRight: spacing[3],
    marginTop: spacing[3],
    minWidth: 100,
    paddingHorizontal: spacing[2],
  },
  roleText: {
    color: color.palette.darkIndigo,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  roleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing[1],
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  submitBtn: {
    marginVertical: spacing[5],
  },
  uploadBtn: {
    borderColor: color.palette.geyser,
    borderWidth: 1,
    marginLeft: spacing[6],
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  uploadText: {
    color: color.palette.slateGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
})

const validationSchema = yup.object().shape({
  firstName: yup.string().label('First Name'),
  lastName: yup.string().label('Last Name'),
  phoneNumber: yup
    .string()
    .label('Phone Number')
    .matches(/^[0-9]+$/, 'Invalid Phone Number'),
  title: yup.string().label('Title'),
  profilePhoto: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .nullable(),
})

const UploadIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      pack="feather"
      color={color.palette.slateGrey}
      name="upload"
      size={14}
      {...style}
    />
  )
}

interface ProfilePhotoInputProps {
  value: ImageSource
  onChange: (value: ImageSource | null) => void
}

const ProfilePhotoInput = ({ value, onChange }: ProfilePhotoInputProps) => {
  const onPress = async () => {
    const source = await showImagePickerAsync()
    if (source) {
      onChange(source)
    }
  }
  return (
    <View style={styles.avatarWrapper}>
      <Avatar source={value || defaultAvatar} size="giant" />
      <Button
        onPress={onPress}
        style={styles.uploadBtn}
        icon={UploadIcon}
        size="small"
        appearance="ghost"
        textStyle={styles.uploadText}
      >
        Upload Image
      </Button>
    </View>
  )
}

interface RoleProps {
  name: string
}

const Role = ({ name }: RoleProps) => (
  <View style={styles.role}>
    <Text style={styles.roleText}>{name}</Text>
  </View>
)

export type SettingsProfileScreenProps = NavigationScreenProps<{}>

export const SettingsProfileScreen: React.FunctionComponent<SettingsProfileScreenProps> = observer(
  () => {
    const {
      userStore: { updateProfile, userProfile },
    } = useStores()

    const {
      firstName,
      lastName,
      phoneNumber,
      title,
      profilePhoto,
      roles,
    } = userProfile

    const onSubmit = async (values: UpdateProfileRequest) => {
      await updateProfile(values)
    }

    const formikForm = ({
      errors,
      handleBlur,
      handleChange,
      setFieldValue,
      handleSubmit,
      isSubmitting,
      touched,
      values,
    }) => (
      <>
        <View style={styles.form}>
          <ProfilePhotoInput
            value={values.profilePhoto}
            onChange={source => setFieldValue('profilePhoto', source)}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.roleWrapper}>
            {roles.map((role: UserRole, index: number) => (
              <Role key={index} name={role.roleName} />
            ))}
          </View>
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
          <FormRow
            label="Last Name"
            error={touched.lastName && errors.lastName}
          >
            <Input
              placeholder="Enter Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
          </FormRow>
          <FormRow
            label="Phone Number"
            error={touched.phoneNumber && errors.phoneNumber}
          >
            <Input
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
            />
          </FormRow>
          <FormRow label="Title" error={touched.title && errors.title}>
            <Input
              placeholder="Enter Title"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />
          </FormRow>
          <Button
            status="primary"
            size="large"
            disabled={isSubmitting}
            onPress={handleSubmit}
            style={styles.submitBtn}
          >
            Save Changes
          </Button>
          {isSubmitting && <Spinner />}
        </View>
      </>
    )

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={styles.screen}
          testID="SettingsProfileScreen"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              firstName,
              lastName,
              phoneNumber,
              title,
              profilePhoto: profilePhoto ? { uri: profilePhoto } : null,
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
