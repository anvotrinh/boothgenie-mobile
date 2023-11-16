import * as React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  Button,
  Input,
  Select,
  Spinner,
  Text,
  FontIcon,
  Datepicker,
  FormRow,
} from '../../../../components'
import { useStores } from '../../../../models/root-store'
import { CreateExpenseRequest } from '../../../../models/stores/budget-category-store'
import { color, spacing, typography } from '../../../../theme'
import { BudgetCategory } from '../../../../services/api'
import { showImagePickerAsync, ImageSource } from '../../../../utils/image'

interface Styles {
  screen: ViewStyle
  form: ViewStyle
  submitBtn: ViewStyle
  dollarIcon: TextStyle
  attachBtn: ViewStyle
  attachDescription: TextStyle
  removeAttachImageBtn: ViewStyle
  attachImage: ImageStyle
  removeAttachImageIcon: TextStyle
}

const styles = StyleSheet.create<Styles>({
  attachBtn: {
    alignItems: 'center',
    backgroundColor: color.palette.paleGrey,
    height: 100,
    justifyContent: 'center',
  },
  attachDescription: {
    color: color.palette.blueyGrey,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
  },
  attachImage: {
    height: 100,
  },
  dollarIcon: {
    position: 'absolute',
  },
  form: {
    backgroundColor: color.palette.white,
    paddingBottom: 20,
    paddingHorizontal: spacing[4],
  },
  removeAttachImageBtn: {
    alignItems: 'center',
    backgroundColor: color.palette.shipGrey,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
    width: 20,
  },
  removeAttachImageIcon: {
    left: 0.5,
    top: 1,
  },
  screen: {
    backgroundColor: color.palette.backgroundGrey,
    flex: 1,
  },
  submitBtn: {
    marginTop: 40,
  },
})

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Name')
    .required('Please enter expense name'),
  budgetCategory: yup
    .object()
    .shape({
      id: yup.string().required(),
      text: yup.string().required(),
    })
    .label('Budget Category')
    .nullable()
    .required('Please select budget category'),
  paymentDate: yup
    .date()
    .label('Payment Date')
    .nullable()
    .required('Please select payment date'),
  paymentAmount: yup
    .string()
    .label('Payment Amount')
    .required('Please enter payment amount'),
  attachment: yup
    .object()
    .shape({
      uri: yup.string().required(),
    })
    .nullable(),
})

interface AttachmentInputProps {
  value: ImageSource
  onChange: (value: ImageSource | null) => void
}

const CalendarIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      pack="feather"
      color={color.palette.frenchGrey}
      name="calendar"
      size={20}
      {...style}
    />
  )
}

const DollarIcon = (style: TextStyle) => {
  if (style.tintColor) delete style.tintColor
  return (
    <FontIcon
      pack="feather"
      color={color.palette.blueyGrey}
      name="dollar-sign"
      size={20}
      {...style}
      style={styles.dollarIcon}
    />
  )
}

const AttachmentInput = ({ value, onChange }: AttachmentInputProps) => {
  const onAttachmentPress = async () => {
    const source = await showImagePickerAsync()
    if (source) {
      onChange(source)
    }
  }
  if (value) {
    return (
      <TouchableOpacity onPress={onAttachmentPress}>
        <Image source={value} style={styles.attachImage} />
        <TouchableOpacity
          onPress={() => onChange(null)}
          style={styles.removeAttachImageBtn}
        >
          <FontIcon
            pack="ant"
            color={color.palette.white}
            name="close"
            size={12}
            style={styles.removeAttachImageIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onAttachmentPress} style={styles.attachBtn}>
      <FontIcon
        pack="entypo"
        color={color.palette.slateGrey}
        name="attachment"
        size={20}
      />
      <Text style={styles.attachDescription}>Tap to add attachment</Text>
    </TouchableOpacity>
  )
}

export type AddExpenseScreenProps = NavigationScreenProps<{}>

export const AddExpenseScreen: React.FunctionComponent<AddExpenseScreenProps> = observer(
  () => {
    const {
      budgetCategoryStore: { budgetCategoriesData, createExpense },
      showStore: { showDetails },
    } = useStores()

    const onSubmit = async (values: CreateExpenseRequest) => {
      await createExpense(showDetails._id, values)
    }

    const budgetCategoriesSelectData = budgetCategoriesData.list.map(
      (b: BudgetCategory) => ({ id: b._id, text: b.name })
    )

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
        <FormRow label="Expense Name" error={touched.name && errors.name}>
          <Input
            placeholder="Enter Name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
        </FormRow>
        <FormRow
          label="Budget Category"
          error={touched.budgetCategory && errors.budgetCategory}
        >
          <Select
            data={budgetCategoriesSelectData}
            selectedOption={values.budgetCategory}
            onPress={Keyboard.dismiss}
            onSelect={option => setFieldValue('budgetCategory', option)}
            placeholder="Select Budget Category"
          />
        </FormRow>
        <FormRow
          label="Payment Date"
          error={touched.paymentDate && errors.paymentDate}
        >
          <Datepicker
            placeholder="Pick Date"
            date={values.paymentDate}
            onSelect={date => setFieldValue('paymentDate', date)}
            icon={CalendarIcon}
          />
        </FormRow>
        <FormRow
          label="Payment Amount"
          error={touched.paymentAmount && errors.paymentAmount}
        >
          <Input
            value={values.paymentAmount}
            keyboardType="numeric"
            onChangeText={handleChange('paymentAmount')}
            onBlur={handleBlur('paymentAmount')}
            icon={DollarIcon}
            textStyle={{ paddingLeft: spacing[4] }}
          />
        </FormRow>
        <FormRow
          label="Attachments"
          error={touched.attachment && errors.attachment}
        >
          <AttachmentInput
            value={values.attachment}
            onChange={source => setFieldValue('attachment', source)}
          />
        </FormRow>
        <Button
          status="primary"
          size="large"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={styles.submitBtn}
        >
          Add Expense
        </Button>
        {isSubmitting && <Spinner />}
      </View>
    )

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={styles.screen}
          testID="AddExpenseScreen"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              name: '',
              budgetCategory: null,
              paymentDate: null,
              paymentAmount: '',
              attachment: null,
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
