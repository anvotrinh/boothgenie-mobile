import * as React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { withFormik } from 'formik'
import * as yup from 'yup'
import { FormRow, Input, FontIcon, Text, Tooltip } from '../../../../components'
import { ROI } from '../../../../services/api'
import { defaultROI } from '../../../../models/stores'
import { color, spacing } from '../../../../theme'
import { startCase } from '../../../../utils/string'
import { formatter, FormatSymbols } from '../../../../utils/number'
import {
  clone,
  isEmptyObject,
  setValueWithPath,
} from '../../../../utils/object'
import { ROIDisplayType, ROIMetadata, DefaultROI } from '../../../../utils/roi'
import { Summary } from './summary'

interface Styles {
  heading: ViewStyle
  input: TextStyle
  questionCircleIcon: TextStyle
  section: ViewStyle
  sectionWrapper: ViewStyle
  tooltipContainerStyle: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  heading: {
    lineHeight: 30,
  },
  input: {
    color: color.palette.blueyGrey,
  },
  questionCircleIcon: {
    fontSize: spacing[4],
    height: 'auto',
    marginVertical: 0,
    width: 'auto',
  },
  section: {
    backgroundColor: color.palette.white,
    padding: spacing[4],
  },
  sectionWrapper: {
    marginBottom: 10,
  },
  tooltipContainerStyle: {
    borderRadius: 4,
  },
})

const Tactic = ({
  errors,
  handleBlur,
  handleChange,
  roiID,
  section,
  showID,
  tactic,
  values,
  updateROI,
}) => {
  const label = ROIMetadata[section][tactic].description || startCase(tactic)
  const QuestionCircleIcon = (style: TextStyle) => {
    if (style.tintColor) delete style.tintColor
    return (
      <Tooltip
        containerStyle={styles.tooltipContainerStyle}
        width={Dimensions.get('window').width - 50}
        popover={<Text style={{ color: color.palette.white }}>{label}</Text>}
        backgroundColor={color.palette.black}
        pointerColor={color.palette.black}
        withOverlay={false}
      >
        <FontIcon
          pack="ant"
          color={color.palette.lightBlueGrey}
          name="questioncircle"
          size={20}
          {...style}
          style={styles.questionCircleIcon}
        />
      </Tooltip>
    )
  }

  const field = `${section}-${tactic}`

  const onBlur = () => {
    handleBlur(field)
    if (isEmptyObject(errors)) {
      const body = clone(roiID)
      Object.keys(values).forEach(sectionTactic => {
        setValueWithPath(
          body,
          sectionTactic.replace('-', '.'),
          formatter(values[sectionTactic]).value()
        )
      })
      updateROI(showID, roiID._id, body)
    }
  }

  return (
    <FormRow label={label} error={errors[field]}>
      <Input
        value={values[field]}
        onChangeText={handleChange(field)}
        onBlur={onBlur}
        icon={QuestionCircleIcon}
        editable={false}
        textStyle={styles.input}
      />
    </FormRow>
  )
}

const Section = ({
  errors,
  handleBlur,
  handleChange,
  index,
  navigateTo,
  roiID,
  section,
  showID,
  values,
  updateROI,
}) => {
  const sectionKeys = Object.keys(roiID[section])
  const formSectionKeys = sectionKeys.filter(
    key => ROIMetadata[section][key].displayType === ROIDisplayType.Form
  )
  const calculationSectionKeys = sectionKeys.filter(
    key =>
      ROIMetadata[section][key].displayType === ROIDisplayType.Calculation &&
      !ROIMetadata[section][key].highlighted
  )
  const summaryTactics = sectionKeys.filter(
    key => ROIMetadata[section][key].highlighted
  )

  const onSummaryPress = () =>
    navigateTo({
      routeName: 'showROIDetails',
      params: {
        headerTitle: ROIMetadata[section].description || startCase(section),
        roiID,
        section,
        tactics: calculationSectionKeys,
        summaryTactics,
      },
    })

  const sectionMarginTop = index === 0 ? 10 : 0

  return (
    <View style={{ ...styles.sectionWrapper, marginTop: sectionMarginTop }}>
      <View style={styles.section}>
        <Text category="h3" style={styles.heading}>
          {ROIMetadata[section].description || startCase(section)}
        </Text>
        {formSectionKeys.map(tactic => (
          <Tactic
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            key={tactic}
            roiID={roiID}
            section={section}
            showID={showID}
            tactic={tactic}
            values={values}
            updateROI={updateROI}
          />
        ))}
      </View>
      {summaryTactics.length > 0 ? (
        summaryTactics.map(tactic => (
          <Summary
            key={tactic}
            tactic={tactic}
            section={section}
            roiID={roiID}
            showArrow
            onPress={onSummaryPress}
          />
        ))
      ) : (
        <Summary showArrow onPress={onSummaryPress} />
      )}
    </View>
  )
}

interface Props {
  navigateTo: (params: object) => void
  roiID: ROI
  showID: string
  updateROI: (showID: string, roiID: string, body: ROI) => void
}

export const FormikForm = ({
  errors,
  handleBlur,
  handleChange,
  navigateTo,
  roiID,
  showID,
  values,
  updateROI,
}) => {
  return Object.keys(roiID)
    .filter(key => typeof roiID[key] === 'object')
    .map((section, index) => (
      <Section
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        index={index}
        key={section}
        navigateTo={navigateTo}
        section={section}
        showID={showID}
        roiID={roiID}
        values={values}
        updateROI={updateROI}
      />
    ))
}

const getValidationSchema = () => {
  const schema = {}
  Object.keys(DefaultROI)
    .filter(key => typeof DefaultROI[key] === 'object')
    .forEach(section => {
      Object.keys(DefaultROI[section]).forEach(tactic => {
        schema[`${section}-${tactic}`] = yup
          .string()
          .required('Required')
          .test('custom', 'Invalid format', (value: string) => {
            switch (ROIMetadata[section][tactic].valueType) {
              case 'currency':
                return (
                  value.startsWith(FormatSymbols.Currency) &&
                  formatter(value) !== null
                )
              case 'percentage':
                return (
                  value.endsWith(FormatSymbols.Percentage) &&
                  formatter(value) !== null
                )
              case 'number':
                return formatter(value) !== null
            }
            return false
          })
      })
    })

  return yup.object().shape(schema)
}

export const Form = withFormik({
  mapPropsToValues({ roiID }: Props) {
    const values = roiID || defaultROI
    const formattedValues = {}
    Object.keys(values)
      .filter(key => typeof values[key] === 'object')
      .forEach(section => {
        Object.keys(values[section]).forEach(tactic => {
          formattedValues[`${section}-${tactic}`] = formatter(
            values[section][tactic],
            {
              preset: ROIMetadata[section][tactic].valueType,
            }
          )
        })
      })

    return formattedValues
  },
  handleSubmit() {},
  validationSchema: getValidationSchema(),
  validateOnChange: true,
})(observer(FormikForm))
