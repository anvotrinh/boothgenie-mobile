import { getEnv, getParent, flow, types } from 'mobx-state-tree'
import {
  CRMActivity,
  PromotionalActivity,
  CostReduction,
  AttendeeInformation,
  VisitorInformation,
  QualifiedLeadInformation,
  ExhibitorInformation,
  StaffInformation,
  PaybackRatiosAndShowValue,
  CostPerInformation,
  ROI,
  UpdateROIResponse,
} from '../../services/api'
import { RootStore } from '../root-store'
import { clone } from '../../utils/object'

const OptionalNumber = types.optional(types.maybeNull(types.number), 0)

export const PromotionalActivityModel = types.model('PromotionalActivity', {
  grossImpressionsThroughExhibitExposure: OptionalNumber,
  totalGrossImpressionsforShow: OptionalNumber,
  qualifiedImpressionsThroughExhibitExposure: OptionalNumber,
  totalQualifiedImpressionsForShow: OptionalNumber,
  totalPromotionalValueForShow: OptionalNumber,
  grossImpressionsthroughPromoActivities: OptionalNumber,
  CPMForGrossImpressions: OptionalNumber,
  qualifiedImpressionsThroughPromoActivities: OptionalNumber,
  CPMForQualifiedImpressions: OptionalNumber,
})

export const defaultPromotionalActivity: PromotionalActivity = {
  grossImpressionsThroughExhibitExposure: 0,
  totalGrossImpressionsforShow: 0,
  qualifiedImpressionsThroughExhibitExposure: 0,
  totalQualifiedImpressionsForShow: 0,
  totalPromotionalValueForShow: 0,
  grossImpressionsthroughPromoActivities: 0,
  CPMForGrossImpressions: 0,
  qualifiedImpressionsThroughPromoActivities: 0,
  CPMForQualifiedImpressions: 0,
}

export const CRMActivityModel = types.model('CRMActivity', {
  valueOfRecords: OptionalNumber,
  customerRevenue: OptionalNumber,
  valueOfCustomers: OptionalNumber,
  totalCRMValue: OptionalNumber,
  valueOfEachRecordAddedToDB: OptionalNumber,
  customersAddressableAtEvent: OptionalNumber,
  averageValueOfCustomersAddressable: OptionalNumber,
  percentOfAvailableCustomersAddressed: OptionalNumber,
  percentOfRetentionEffortRepresented: OptionalNumber,
})

export const defaultCRMActivity: CRMActivity = {
  valueOfRecords: 0,
  customerRevenue: 0,
  valueOfCustomers: 0,
  totalCRMValue: 0,
  valueOfEachRecordAddedToDB: 0,
  customersAddressableAtEvent: 0,
  averageValueOfCustomersAddressable: 0,
  percentOfAvailableCustomersAddressed: 0,
  percentOfRetentionEffortRepresented: 0,
}

export const CostReductionModel = types.model('CostReduction', {
  customerMeetingsCostSavings: OptionalNumber,
  staffTrainingsOrMeetingsCostSavings: OptionalNumber,
  recruitmentCostSavings: OptionalNumber,
  channelPartnerMeetingsCostSavings: OptionalNumber,
  totalCostAvoidance: OptionalNumber,
  averageCost: OptionalNumber,
  staffTrainingAndMeetingHours: OptionalNumber,
  interviewsAndRecruitmentMeetingsHeld: OptionalNumber,
  channelPartnerMeetingsHeld: OptionalNumber,
  add1: OptionalNumber,
  add2: OptionalNumber,
  additionalCostReductionItem: OptionalNumber,
})

export const defaultCostReduction: CostReduction = {
  customerMeetingsCostSavings: 0,
  staffTrainingsOrMeetingsCostSavings: 0,
  recruitmentCostSavings: 0,
  channelPartnerMeetingsCostSavings: 0,
  totalCostAvoidance: 0,
  averageCost: 0,
  staffTrainingAndMeetingHours: 0,
  interviewsAndRecruitmentMeetingsHeld: 0,
  channelPartnerMeetingsHeld: 0,
  add1: 0,
  add2: 0,
  additionalCostReductionItem: 0,
}

export const AttendeeInformationModel = types.model('AttendeeInformation', {
  attendeesAtShowPerHour: OptionalNumber,
  showAttendance: OptionalNumber,
  percentOfAttendeesMeetingQualifiedProfile: OptionalNumber,
  totalHours: OptionalNumber,
  averageExhibitsVisited: OptionalNumber,
})

export const defaultAttendeeInformation: AttendeeInformation = {
  attendeesAtShowPerHour: 0,
  showAttendance: 0,
  percentOfAttendeesMeetingQualifiedProfile: 0,
  totalHours: 0,
  averageExhibitsVisited: 0,
}

export const VisitorInformationModel = types.model('VisitorInformation', {
  visitorsAvailableToAverageExhibitPerHour: OptionalNumber,
  visitorsExpectedPerHour: OptionalNumber,
  totalVisitorsExpectedForShow: OptionalNumber,
  totalEngagedVisitorsExpectedForShow: OptionalNumber,
  visitorTurnoverPerHour: OptionalNumber,
  percentOfTotalVisitorCommited: OptionalNumber,
  percentOfTotalVisitorEngaged: OptionalNumber,
})

export const defaultVisitorInformation: VisitorInformation = {
  visitorsAvailableToAverageExhibitPerHour: 0,
  visitorsExpectedPerHour: 0,
  totalVisitorsExpectedForShow: 0,
  totalEngagedVisitorsExpectedForShow: 0,
  visitorTurnoverPerHour: 0,
  percentOfTotalVisitorCommited: 0,
  percentOfTotalVisitorEngaged: 0,
}

export const QualifiedLeadInformationModel = types.model(
  'QualifiedLeadInformation',
  {
    estimatedQualifiedAttendanceAtShow: OptionalNumber,
    qualifiedVisitorsExpectedPerHour: OptionalNumber,
    totalQualifiedVisitorsExpectedForShow: OptionalNumber,
    percentOfQualifiedAttendeesCaptured: OptionalNumber,
    totalValueOfQualifiedLeadsForShow: OptionalNumber,
    costOfAcquiring: OptionalNumber,
  }
)

export const defaultQualifiedLeadInformation: QualifiedLeadInformation = {
  estimatedQualifiedAttendanceAtShow: 0,
  qualifiedVisitorsExpectedPerHour: 0,
  totalQualifiedVisitorsExpectedForShow: 0,
  percentOfQualifiedAttendeesCaptured: 0,
  totalValueOfQualifiedLeadsForShow: 0,
  costOfAcquiring: 0,
}

export const ExhibitorInformationModel = types.model('ExhibitorInformation', {
  averageExhibitSizeAtShow: OptionalNumber,
  exhibitSizeRequiredToHandleAllVisitors: OptionalNumber,
  exhibitSizeRequiredToHandleAllQualifiedVisitors: OptionalNumber,
  overallAttractionFactor: OptionalNumber,
  totalExhibitors: OptionalNumber,
  totalExhibitionSqFt: OptionalNumber,
  exhibitorBoothSize: OptionalNumber,
  minimumSqFtPerVisitor: OptionalNumber,
  percentOfBoothSpaceAvailable: OptionalNumber,
  exhibitorPromotionalFactor: OptionalNumber,
  exhibitPlacementFactor: OptionalNumber,
})

export const defaultExhibitorInformation: ExhibitorInformation = {
  averageExhibitSizeAtShow: 0,
  exhibitSizeRequiredToHandleAllVisitors: 0,
  exhibitSizeRequiredToHandleAllQualifiedVisitors: 0,
  overallAttractionFactor: 0,
  totalExhibitors: 0,
  totalExhibitionSqFt: 0,
  exhibitorBoothSize: 0,
  minimumSqFtPerVisitor: 0,
  percentOfBoothSpaceAvailable: 0,
  exhibitorPromotionalFactor: 0,
  exhibitPlacementFactor: 0,
}

export const StaffInformationModel = types.model('StaffInformation', {
  suggestedStaffPerShift: OptionalNumber,
  visitorsHandledPerStaffHour: OptionalNumber,
  desiredVisitorToStafferRatio: OptionalNumber,
  actualStaffPerShift: OptionalNumber,
})

export const defaultStaffInformation: StaffInformation = {
  suggestedStaffPerShift: 0,
  visitorsHandledPerStaffHour: 0,
  desiredVisitorToStafferRatio: 0,
  actualStaffPerShift: 0,
}

export const PaybackRatiosAndShowValueModel = types.model(
  'PaybackRatiosAndShowValue',
  {
    suggestedBudgetFromIndustryAverages: OptionalNumber,
    actualBudgetOrSuggestedBudget: OptionalNumber,
    totalValueExpectedfromVisitorsAndQualifiedLeads: OptionalNumber,
    totalFutureRevenueEstimatedfromShow: OptionalNumber,
    grossPaybackRatio: OptionalNumber,
    expectedNetFuturePaybackRatio: OptionalNumber,
    showBudget: OptionalNumber,
    averageRevenueOfAllSales: OptionalNumber,
    percentOfQualifiedLeadsClosedAsSales: OptionalNumber,
    averageProfitMarginOnAllSales: OptionalNumber,
  }
)

export const defaultPaybackRatiosAndShowValue: PaybackRatiosAndShowValue = {
  suggestedBudgetFromIndustryAverages: 0,
  actualBudgetOrSuggestedBudget: 0,
  totalValueExpectedfromVisitorsAndQualifiedLeads: 0,
  totalFutureRevenueEstimatedfromShow: 0,
  grossPaybackRatio: 0,
  expectedNetFuturePaybackRatio: 0,
  showBudget: 0,
  averageRevenueOfAllSales: 0,
  percentOfQualifiedLeadsClosedAsSales: 0,
  averageProfitMarginOnAllSales: 0,
}

export const CostPerInformationModel = types.model('CostPerInformation', {
  costPerExpectedVisitor: OptionalNumber,
  costPerEngagedVisitor: OptionalNumber,
  costPerQualifiedLead: OptionalNumber,
  costPerSquareFoot: OptionalNumber,
})

export const defaultCostPerInformation: CostPerInformation = {
  costPerExpectedVisitor: 0,
  costPerEngagedVisitor: 0,
  costPerQualifiedLead: 0,
  costPerSquareFoot: 0,
}

export const ROIModel = types.model('ROI', {
  _id: types.string,
  promotionalActivity: types.optional(
    PromotionalActivityModel,
    defaultPromotionalActivity
  ),
  crmActivity: types.optional(CRMActivityModel, defaultCRMActivity),
  costReduction: types.optional(CostReductionModel, defaultCostReduction),
  attendeeInformation: types.optional(
    AttendeeInformationModel,
    defaultAttendeeInformation
  ),
  visitorInformation: types.optional(
    VisitorInformationModel,
    defaultVisitorInformation
  ),
  qualifiedLeadInformation: types.optional(
    QualifiedLeadInformationModel,
    defaultQualifiedLeadInformation
  ),
  exhibitorInformation: types.optional(
    ExhibitorInformationModel,
    defaultExhibitorInformation
  ),
  staffInformation: types.optional(
    StaffInformationModel,
    defaultStaffInformation
  ),
  paybackRatiosAndShowValue: types.optional(
    PaybackRatiosAndShowValueModel,
    defaultPaybackRatiosAndShowValue
  ),
  costPerInformation: types.optional(
    CostPerInformationModel,
    defaultCostPerInformation
  ),
})

export const defaultROI: ROI = {
  _id: '',
  crmActivity: defaultCRMActivity,
  promotionalActivity: defaultPromotionalActivity,
  costReduction: defaultCostReduction,
  attendeeInformation: defaultAttendeeInformation,
  visitorInformation: defaultVisitorInformation,
  qualifiedLeadInformation: defaultQualifiedLeadInformation,
  exhibitorInformation: defaultExhibitorInformation,
  staffInformation: defaultStaffInformation,
  paybackRatiosAndShowValue: defaultPaybackRatiosAndShowValue,
  costPerInformation: defaultCostPerInformation,
}

export const ROIStoreModel = types
  .model('ROIStore', {
    updateROILoading: false,
  })
  .views(self => ({
    get api() {
      return getEnv(self).api as Api
    },
    get rootStore() {
      return getParent<RootStore>(self)
    },
    get showStore() {
      return self.rootStore.showStore
    },
    get organizationID() {
      return self.rootStore.userStore.userProfile.organizationID
    },
    get showMessage() {
      return getEnv(self).showMessage
    },
  }))
  .actions(self => ({
    updateROI: flow(function* updateROI(showID, roiID, body: ROI) {
      self.updateROILoading = true
      const response: UpdateROIResponse = yield self.api.roiApi.updateROI({
        organizationID: self.organizationID,
        showID,
        roiID,
        body,
      })
      self.updateROILoading = false

      if (response.kind === 'ok') {
        const { showDetails, setShowDetails } = self.showStore
        const temp = clone(showDetails)
        temp.roiID[0] = response.data
        setShowDetails(temp)
        self.showMessage({
          type: 'success',
          message: 'Success',
          description: 'Update ROI success!',
        })
      } else {
        self.showMessage({
          type: 'danger',
          message: 'Error',
          description: response.message,
        })
      }
    }),
  }))
