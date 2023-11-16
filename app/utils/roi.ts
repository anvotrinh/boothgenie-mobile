export const ROIDisplayType = {
  Form: 1,
  Calculation: 2,
}

export const ROIValueType = {
  Number: 'number',
  Currency: 'currency',
  Percentage: 'percentage',
}

export const ROIMetadata = {
  promotionalActivity: {
    grossImpressionsThroughExhibitExposure: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalGrossImpressionsforShow: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
      description: 'Total Gross Impressions for Show',
    },
    qualifiedImpressionsThroughExhibitExposure: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalQualifiedImpressionsForShow: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalPromotionalValueForShow: {
      valueType: ROIValueType.Currency,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    grossImpressionsthroughPromoActivities: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
      description: 'Gross Impressions through Promo Activities',
    },
    CPMForGrossImpressions: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    qualifiedImpressionsThroughPromoActivities: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    CPMForQualifiedImpressions: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  crmActivity: {
    description: 'CRM Activity',
    valueOfRecords: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    customerRevenue: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    valueOfCustomers: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalCRMValue: {
      valueType: ROIValueType.Currency,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    valueOfEachRecordAddedToDB: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    customersAddressableAtEvent: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    averageValueOfCustomersAddressable: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfAvailableCustomersAddressed: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfRetentionEffortRepresented: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  costReduction: {
    customerMeetingsCostSavings: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    staffTrainingsOrMeetingsCostSavings: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    recruitmentCostSavings: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    channelPartnerMeetingsCostSavings: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalCostAvoidance: {
      valueType: ROIValueType.Currency,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    averageCost: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    staffTrainingAndMeetingHours: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    interviewsAndRecruitmentMeetingsHeld: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    channelPartnerMeetingsHeld: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    add1: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    add2: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    additionalCostReductionItem: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  attendeeInformation: {
    attendeesAtShowPerHour: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    showAttendance: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfAttendeesMeetingQualifiedProfile: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    totalHours: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    averageExhibitsVisited: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  visitorInformation: {
    visitorsAvailableToAverageExhibitPerHour: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    visitorsExpectedPerHour: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalVisitorsExpectedForShow: {
      valueType: ROIValueType.Number,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    totalEngagedVisitorsExpectedForShow: {
      valueType: ROIValueType.Number,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    visitorTurnoverPerHour: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfTotalVisitorCommited: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfTotalVisitorEngaged: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  qualifiedLeadInformation: {
    estimatedQualifiedAttendanceAtShow: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    qualifiedVisitorsExpectedPerHour: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalQualifiedVisitorsExpectedForShow: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    percentOfQualifiedAttendeesCaptured: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalValueOfQualifiedLeadsForShow: {
      valueType: ROIValueType.Currency,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    costOfAcquiring: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  exhibitorInformation: {
    averageExhibitSizeAtShow: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    exhibitSizeRequiredToHandleAllVisitors: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    exhibitSizeRequiredToHandleAllQualifiedVisitors: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    overallAttractionFactor: {
      valueType: ROIValueType.Number,
      highlighted: true,
      displayType: ROIDisplayType.Calculation,
    },
    totalExhibitors: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    totalExhibitionSqFt: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    exhibitorBoothSize: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    minimumSqFtPerVisitor: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfBoothSpaceAvailable: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    exhibitorPromotionalFactor: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    exhibitPlacementFactor: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  staffInformation: {
    suggestedStaffPerShift: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    visitorsHandledPerStaffHour: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    desiredVisitorToStafferRatio: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    actualStaffPerShift: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  paybackRatiosAndShowValue: {
    suggestedBudgetFromIndustryAverages: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    actualBudgetOrSuggestedBudget: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalValueExpectedfromVisitorsAndQualifiedLeads: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    totalFutureRevenueEstimatedfromShow: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
      description: 'Total Future Revenue Estimated from Show',
    },
    grossPaybackRatio: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    expectedNetFuturePaybackRatio: {
      valueType: ROIValueType.Number,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    showBudget: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    averageRevenueOfAllSales: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    percentOfQualifiedLeadsClosedAsSales: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
    averageProfitMarginOnAllSales: {
      valueType: ROIValueType.Percentage,
      highlighted: false,
      displayType: ROIDisplayType.Form,
    },
  },

  costPerInformation: {
    costPerExpectedVisitor: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    costPerEngagedVisitor: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    costPerQualifiedLead: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
    costPerSquareFoot: {
      valueType: ROIValueType.Currency,
      highlighted: false,
      displayType: ROIDisplayType.Calculation,
    },
  },
}

export const DefaultROI = {
  _id: '',
  attendeeInformation: {
    attendeesAtShowPerHour: 0,
    averageExhibitsVisited: 0,
    percentOfAttendeesMeetingQualifiedProfile: 0,
    showAttendance: 0,
    totalHours: 0,
  },
  costPerInformation: {
    costPerEngagedVisitor: 0,
    costPerExpectedVisitor: 0,
    costPerQualifiedLead: 0,
    costPerSquareFoot: 0,
  },
  costReduction: {
    add1: 0,
    add2: 0,
    additionalCostReductionItem: 0,
    averageCost: 0,
    channelPartnerMeetingsCostSavings: 0,
    channelPartnerMeetingsHeld: 0,
    customerMeetingsCostSavings: 0,
    interviewsAndRecruitmentMeetingsHeld: 0,
    recruitmentCostSavings: 0,
    staffTrainingAndMeetingHours: 0,
    staffTrainingsOrMeetingsCostSavings: 0,
    totalCostAvoidance: 0,
  },
  crmActivity: {
    averageValueOfCustomersAddressable: 0,
    customerRevenue: 0,
    customersAddressableAtEvent: 0,
    percentOfAvailableCustomersAddressed: 0,
    percentOfRetentionEffortRepresented: 0,
    totalCRMValue: 0,
    valueOfCustomers: 0,
    valueOfEachRecordAddedToDB: 0,
    valueOfRecords: 0,
  },
  exhibitorInformation: {
    averageExhibitSizeAtShow: 0,
    exhibitPlacementFactor: 0,
    exhibitSizeRequiredToHandleAllQualifiedVisitors: 0,
    exhibitSizeRequiredToHandleAllVisitors: 0,
    exhibitorBoothSize: 0,
    exhibitorPromotionalFactor: 0,
    minimumSqFtPerVisitor: 0,
    overallAttractionFactor: 0,
    percentOfBoothSpaceAvailable: 0,
    totalExhibitionSqFt: 0,
    totalExhibitors: 0,
  },
  paybackRatiosAndShowValue: {
    actualBudgetOrSuggestedBudget: 0,
    averageProfitMarginOnAllSales: 0,
    averageRevenueOfAllSales: 0,
    expectedNetFuturePaybackRatio: 0,
    grossPaybackRatio: 0,
    percentOfQualifiedLeadsClosedAsSales: 0,
    showBudget: 0,
    suggestedBudgetFromIndustryAverages: 0,
    totalFutureRevenueEstimatedfromShow: 0,
    totalValueExpectedfromVisitorsAndQualifiedLeads: 0,
  },
  promotionalActivity: {
    CPMForGrossImpressions: 0,
    CPMForQualifiedImpressions: 0,
    grossImpressionsThroughExhibitExposure: 0,
    grossImpressionsthroughPromoActivities: 0,
    qualifiedImpressionsThroughExhibitExposure: 0,
    qualifiedImpressionsThroughPromoActivities: 0,
    totalGrossImpressionsforShow: 0,
    totalPromotionalValueForShow: 0,
    totalQualifiedImpressionsForShow: 0,
  },
  qualifiedLeadInformation: {
    costOfAcquiring: 0,
    estimatedQualifiedAttendanceAtShow: 0,
    percentOfQualifiedAttendeesCaptured: 0,
    qualifiedVisitorsExpectedPerHour: 0,
    totalQualifiedVisitorsExpectedForShow: 0,
    totalValueOfQualifiedLeadsForShow: 0,
  },
  staffInformation: {
    actualStaffPerShift: 0,
    desiredVisitorToStafferRatio: 0,
    suggestedStaffPerShift: 0,
    visitorsHandledPerStaffHour: 0,
  },
  visitorInformation: {
    percentOfTotalVisitorCommited: 0,
    percentOfTotalVisitorEngaged: 0,
    totalEngagedVisitorsExpectedForShow: 0,
    totalVisitorsExpectedForShow: 0,
    visitorTurnoverPerHour: 0,
    visitorsAvailableToAverageExhibitPerHour: 0,
    visitorsExpectedPerHour: 0,
  },
}
