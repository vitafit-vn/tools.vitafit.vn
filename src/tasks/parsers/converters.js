import _ from 'lodash';

export function convertDailySchedulesRecords(records) {
  const dailySchedules = [];
  let currentSchedule;
  let currentExercises = [];

  _.each(records, row => {
    const scheduleName = row[0];

    // New daily schedule
    if (!_.isEmpty(scheduleName)) {
      // Save current schedule
      if (!_.isEmpty(currentSchedule)) {
        const [code, muscles] = currentSchedule.split(/\s*[()]/);
        dailySchedules.push({ code, muscles, exercises: currentExercises });
      }

      // Move to next schedule
      currentSchedule = scheduleName;
      currentExercises = [];
      return;
    }

    // Next exercise in current daily schedule
    const [, code, name, sets, reps, rpe, rest] = row;
    const exercise = {
      code, name, reps, rest, rpe, sets,
    };

    currentExercises.push(exercise);
  });

  // Save last schedule
  if (!_.isEmpty(currentSchedule)) {
    dailySchedules.push({ name: currentSchedule, exercises: currentExercises });
  }

  return dailySchedules;
}

export function convertExercisesDatabase(records) {
  return _.map(records, row => {
    const [code, name, muscle, difficulty, instructions, videoUrl] = row;
    return {
      code, difficulty, instructions, muscle, name, videoUrl,
    };
  });
}

export function convertWeeklySchedulesRecords(records) {
  return _.map(records, row => {
    const [code, variant, ...rawDailyCodes] = row;
    const dailyCodes = _.map(rawDailyCodes, codes => _.map(_.split(codes, '\n'), _.partial(_.replace, _, 'OFF', 'NGHỈ')));
    return { code, dailyCodes, variant };
  });
}
