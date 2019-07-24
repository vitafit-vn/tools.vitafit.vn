// Data
import DAILY_SCHEDULES_BEGINNER from './data/daily_schedules_beginner.json';
import DAILY_SCHEDULES_INTERMEDIATE from './data/daily_schedules_intermediate.json';
import DAILY_SCHEDULES_SHARED from './data/daily_schedules_shared.json';
import EXERCISES_DATABASE from './data/exercises_database.json';
import WEEKLY_SCHEDULES from './data/weekly_schedules.json';

const WORKOUT_LEVELS = ['beginner', 'intermediate'];

const DAILY_SCHEDULES = {
  beginner: DAILY_SCHEDULES_BEGINNER,
  intermediate: DAILY_SCHEDULES_INTERMEDIATE,
  shared: DAILY_SCHEDULES_SHARED,
};

const OFF_DAY = 'NGHỈ';

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

// const BASE_URL = 'https://4ju8elyjv7.execute-api.us-east-1.amazonaws.com/production';
const BASE_URL = 'https://u03zcg5h97.execute-api.us-east-1.amazonaws.com/dev';

export { BASE_URL, DAILY_SCHEDULES, EXERCISES_DATABASE, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES, WORKOUT_LEVELS };
