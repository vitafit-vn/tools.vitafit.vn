import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';

// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

const INPUT_CONFIGS = {
  birthYear: { label: 'Năm sinh', max: 2010, min: 1950, type: 'number' },
  customerId: { label: 'Mã KH' },
  fullName: { label: 'Tên gọi' },
  height: { label: 'Chiều cao', max: 200, min: 100, step: 0.1, suffix: 'cm', type: 'number' },
  weekPeriod: { label: 'Tuần', type: 'week' },
  weight: { label: 'Cân nặng', max: 100, min: 30, step: 0.1, suffix: 'kg', type: 'number' },
};

export default class CustomerInfo extends Component {
  static propTypes = {
    data: PropTypes.shape({
      birthYear: PropTypes.number,
      customerId: PropTypes.string,
      fullName: PropTypes.string,
      height: PropTypes.number,
      weekPeriod: PropTypes.string,
      weeklyCode: PropTypes.string,
      weight: PropTypes.number,
      workoutLevel: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      birthYear,
      customerId,
      fullName,
      height,
      weekPeriod,
      weeklyCode: presetWeeklyCode,
      weight,
      workoutLevel: presetWorkoutLevel,
    } = this.props.data;

    const weeklyCode = presetWeeklyCode || WEEKLY_SCHEDULES[0].code;
    const workoutLevel = presetWorkoutLevel || WORKOUT_LEVELS[0];

    this.state = { birthYear, customerId, fullName, height, weekPeriod, weeklyCode, weight, workoutLevel };
  }

  onInputChange = key => event => this.props.onUpdate({ [key]: event.target.value });

  renderInput = id => {
    const { [id]: value } = this.props.data;
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={id} onChange={this.onInputChange(id)} required value={value} />;
  };

  renderWorkoutLevels = selectedWorkoutLevel => (
    <div className="form-group">
      <label htmlFor="workout-level">{'Trình độ'}</label>
      <select
        className="custom-select"
        id="workoutLevel"
        onChange={this.onInputChange('workoutLevel')}
        required
        value={selectedWorkoutLevel}
      >
        {_.map(WORKOUT_LEVELS, level => (
          <option value={level}>{_.capitalize(level)}</option>
        ))}
      </select>
    </div>
  );

  renderWeeklyCodes = selectedWeeklyCode => (
    <div className="form-group">
      <label htmlFor="weekly-code">{'Preset lịch tuần'}</label>
      <select
        className="custom-select"
        id="weeklyCode"
        onChange={this.onInputChange('weeklyCode')}
        required
        value={selectedWeeklyCode}
      >
        {_.map(WEEKLY_SCHEDULES, ({ code, description, frequency, shortkeys }) => (
          <option title={description} value={code}>{`${frequency} (${shortkeys})`}</option>
        ))}
      </select>
    </div>
  );

  render() {
    const { weeklyCode, workoutLevel } = this.props.data;
    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0];
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;

    return (
      <div className="col-3">
        {this.renderInput('customerId')}
        {this.renderInput('fullName')}
        {this.renderInput('birthYear')}
        {this.renderInput('height')}
        {this.renderInput('weight')}
        {this.renderWorkoutLevels(selectedWorkoutLevel)}
        {this.renderWeeklyCodes(selectedWeeklyCode)}
        {this.renderInput('weekPeriod')}
      </div>
    );
  }
}