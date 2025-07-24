export const AdConstant = {
  // Gender (string constants)
  AUDIENCE_TARGET_MALE: 'male',
  AUDIENCE_TARGET_FEMALE: 'female',

  // Age group (int constants)
  AGE_GROUP_18_24: 1,
  AGE_GROUP_25_34: 2,
  AGE_GROUP_35_44: 3,
  AGE_GROUP_45_54: 4,
  AGE_GROUP_55_PLUS: 5,

  // Status options
  STATUS_REVIEW: 1,
  STATUS_ACTIVE: 2,
  STATUS_PAUSE: 3,

  // Gender options
  getGenderOptions() {
    return {
      [this.AUDIENCE_TARGET_MALE]: 'Male',
      [this.AUDIENCE_TARGET_FEMALE]: 'Female',
    };
  },

  // Age group options
  getAgeGroupOptions() {
    return {
      [this.AGE_GROUP_18_24]: '18–24',
      [this.AGE_GROUP_25_34]: '25–34',
      [this.AGE_GROUP_35_44]: '35–44',
      [this.AGE_GROUP_45_54]: '45–54',
      [this.AGE_GROUP_55_PLUS]: '55+',
    };
  },

  // Status options
  getStatusOptions() {
    return {
      [this.STATUS_REVIEW]: 'Under Review',
      [this.STATUS_ACTIVE]: 'Active',
      [this.STATUS_PAUSE]: 'Paused',
    };
  },
};
