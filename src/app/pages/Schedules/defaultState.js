// Constants
import { /* IS_PRODUCTION, */ WEEKLY_SCHEDULES, WORKOUT_LEVELS, WORKOUT_VARIANTS } from 'app/constants';

export default {
  customerInfo: {
    birthYear: undefined,
    customerId: undefined,
    fullName: undefined,
    height: undefined,
    weekPeriod: undefined,
    weeklyCode: WEEKLY_SCHEDULES[0].code,
    weight: undefined,
    workoutLevel: WORKOUT_LEVELS[0].code,
    workoutVariant: WORKOUT_VARIANTS[0].code,
  },
  personalizedData: {
    bulkRecommendedWeight: undefined,
    bulkRest: undefined,
    bulkRpe: undefined,
    recommendedWeight: {},
    rest: {},
    rpe: {},
  },
  // ...(IS_PRODUCTION ? {} : require('app/data/fixtures/schedules_input.json')), // eslint-disable-line
};
