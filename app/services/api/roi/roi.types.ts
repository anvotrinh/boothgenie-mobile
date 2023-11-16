import { GeneralApiProblem } from '../api-problem'

export interface PromotionalActivity {
  grossImpressionsThroughExhibitExposure?: number
  totalGrossImpressionsforShow?: number
  qualifiedImpressionsThroughExhibitExposure?: number
  totalQualifiedImpressionsForShow?: number
  totalPromotionalValueForShow?: number
  grossImpressionsthroughPromoActivities?: number
  CPMForGrossImpressions?: number
  qualifiedImpressionsThroughPromoActivities?: number
  CPMForQualifiedImpressions?: number
}

export interface CRMActivity {
  valueOfRecords?: number
  customerRevenue?: number
  valueOfCustomers?: number
  totalCRMValue?: number
  valueOfEachRecordAddedToDB?: number
  customersAddressableAtEvent?: number
  averageValueOfCustomersAddressable?: number
  percentOfAvailableCustomersAddressed?: number
  percentOfRetentionEffortRepresented?: number
}

export interface CostReduction {
  customerMeetingsCostSavings?: number
  staffTrainingsOrMeetingsCostSavings?: number
  recruitmentCostSavings?: number
  channelPartnerMeetingsCostSavings?: number
  totalCostAvoidance?: number
  averageCost?: number
  staffTrainingAndMeetingHours?: number
  interviewsAndRecruitmentMeetingsHeld?: number
  channelPartnerMeetingsHeld?: number
  add1?: number
  add2?: number
  additionalCostReductionItem?: number
}

export interface AttendeeInformation {
  attendeesAtShowPerHour?: number
  showAttendance?: number
  percentOfAttendeesMeetingQualifiedProfile?: number
  totalHours?: number
  averageExhibitsVisited?: number
}

export interface VisitorInformation {
  visitorsAvailableToAverageExhibitPerHour?: number
  visitorsExpectedPerHour?: number
  totalVisitorsExpectedForShow?: number
  totalEngagedVisitorsExpectedForShow?: number
  visitorTurnoverPerHour?: number
  percentOfTotalVisitorCommited?: number
  percentOfTotalVisitorEngaged?: number
}

export interface QualifiedLeadInformation {
  estimatedQualifiedAttendanceAtShow?: number
  qualifiedVisitorsExpectedPerHour?: number
  totalQualifiedVisitorsExpectedForShow?: number
  percentOfQualifiedAttendeesCaptured?: number
  totalValueOfQualifiedLeadsForShow?: number
  costOfAcquiring?: number
}

export interface ExhibitorInformation {
  averageExhibitSizeAtShow?: number
  exhibitSizeRequiredToHandleAllVisitors?: number
  exhibitSizeRequiredToHandleAllQualifiedVisitors?: number
  overallAttractionFactor?: number
  totalExhibitors?: number
  totalExhibitionSqFt?: number
  exhibitorBoothSize?: number
  minimumSqFtPerVisitor?: number
  percentOfBoothSpaceAvailable?: number
  exhibitorPromotionalFactor?: number
  exhibitPlacementFactor?: number
}

export interface StaffInformation {
  suggestedStaffPerShift?: number
  visitorsHandledPerStaffHour?: number
  desiredVisitorToStafferRatio?: number
  actualStaffPerShift?: number
}

export interface PaybackRatiosAndShowValue {
  suggestedBudgetFromIndustryAverages?: number
  actualBudgetOrSuggestedBudget?: number
  totalValueExpectedfromVisitorsAndQualifiedLeads?: number
  totalFutureRevenueEstimatedfromShow?: number
  grossPaybackRatio?: number
  expectedNetFuturePaybackRatio?: number
  showBudget?: number
  averageRevenueOfAllSales?: number
  percentOfQualifiedLeadsClosedAsSales?: number
  averageProfitMarginOnAllSales?: number
}

export interface CostPerInformation {
  costPerExpectedVisitor?: number
  costPerEngagedVisitor?: number
  costPerQualifiedLead?: number
  costPerSquareFoot?: number
}

export interface ROI {
  _id: string
  promotionalActivity: PromotionalActivity
  crmActivity: CRMActivity
  costReduction: CostReduction
  attendeeInformation: AttendeeInformation
  visitorInformation: VisitorInformation
  qualifiedLeadInformation: QualifiedLeadInformation
  exhibitorInformation: ExhibitorInformation
  staffInformation: StaffInformation
  paybackRatiosAndShowValue: PaybackRatiosAndShowValue
  costPerInformation: CostPerInformation
}

export interface UpdateROIRequest {
  organizationID: string
  showID: string
  roiID: string
  body: ROI
}

export type UpdateROIResponse = { kind: 'ok'; data: ROI } | GeneralApiProblem
