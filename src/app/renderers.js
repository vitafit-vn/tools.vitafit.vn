import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

// Locals
import CONSTANTS from './constants';
import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
}

registerPartials();

const SITE_CONFIGS = {
  pageTitle: process.env.PAGE_TITLE,
  publicPath: process.env.PUBLIC_PATH,
};

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule({
  userInfo, weeklyCode, weekVariant, workoutLevel,
}) {
  const weeklyData = _.find(CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;
  const daySchedules = _.map(dailyCodes, codes => {
    const dayExercises = _.filter(
      CONSTANTS.DAILY_SCHEDULES[workoutLevel],
      ({ code }) => _.includes(codes, code),
    );
    return _.flatMap(dayExercises, 'exercises');
  });

  window.renderingParams = {
    daySchedules, userInfo, dailyCodes, site: SITE_CONFIGS, weekdays: CONSTANTS.WEEKDAYS,
  };

  return Handlebars.templates.weekly({
    daySchedules, userInfo, dailyCodes, site: SITE_CONFIGS, weekdays: CONSTANTS.WEEKDAYS,
  });
}
