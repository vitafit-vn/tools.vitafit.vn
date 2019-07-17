import CONSTANTS from './constants';
import { renderDailySchedule, renderPersonalizedRows, renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

const UTILS = {
  computeChecksum,
  renderDailySchedule,
  renderPersonalizedRows,
  renderWeeklySchedule,
};

const VSG = { CONSTANTS, UTILS };
Object.assign(window, { VSG });
