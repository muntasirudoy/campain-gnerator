export const CAMPAIGN_GOAL = {
  awarness: 1,
  trafic: 2,
  default: 1
};
export const CAMPAIGN_BUDGET_TYPE = {
  total: 1,
  daily: 2,
  default: 1
};



export const CampaignConstant = {
  // Format Ads options
  FORMAT_ADS_VIDEO: 1,

  // Bid Strategy options
  BID_STRATEGY_TARGET_CPP: 1,

  // Budget Type options
  BUDGET_TYPE_CAMPAIGN_TOTAL: 1,
  BUDGET_TYPE_DAILY: 2,

  // Location options
  LOCATION_ALL_BD: 1,

  // Status options
  STATUS_REVIEW: 1,
  STATUS_ACTIVE: 2,
  STATUS_PAUSE: 3,

  // Get Format Ads Options
  getFormatAdsOptions() {
    return {
      [this.FORMAT_ADS_VIDEO]: "Video",
    };
  },

  // Get Bid Strategy Options
  getBidStrategyOptions() {
    return {
      [this.BID_STRATEGY_TARGET_CPP]: "Target CPP",
    };
  },

  // Get Budget Type Options
  getBudgetTypeOptions() {
    return {
      [this.BUDGET_TYPE_CAMPAIGN_TOTAL]: "Campaign Total",
      [this.BUDGET_TYPE_DAILY]: "Daily",
    };
  },

  // Get Location Options
  getLocationOptions() {
    return {
      [this.LOCATION_ALL_BD]: "All Bangladesh",
    };
  },

  // Get Status Options
  getStatusOptions() {
    return {
      [this.STATUS_REVIEW]: "Under Review",
      [this.STATUS_ACTIVE]: "Active",
      [this.STATUS_PAUSE]: "Paused",
    };
  },
};
