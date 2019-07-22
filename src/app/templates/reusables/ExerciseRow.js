import _ from 'lodash';
import PropTypes from 'prop-types';

const ExerciseRow = ({ difficulty, muscle, name, order, recommendedWeight, reps, rest, rpe, sets, videoUrl }) => (
  <tr>
    <td className="align-middle border border-primary p-2 text-left">
      {`${order}. ${name}`}.
      {!_.isEmpty(videoUrl) && (
        <a href={videoUrl} rel="noopener noreferrer" target="_blank">
          <i className="icon ion-logo-youtube ml-1 youtube-link"></i>
        </a>
      )}
    </td>
    <td className="align-middle border border-primary p-2">{muscle}</td>
    <td className="align-middle border border-primary p-2">{difficulty}</td>
    <td className="align-middle border border-primary p-2">{sets}</td>
    <td className="align-middle border border-primary p-2">{reps}</td>
    <td className="align-middle border border-primary p-2">{_.isEmpty(rpe) ? '-' : `RPE-${rpe}`}</td>
    <td className="align-middle border border-primary p-2">{_.isEmpty(rest) ? '-' : `${rest}s`}</td>
    <td className="align-middle border border-primary p-2">
      {_.isEmpty(recommendedWeight) ? '-' : `${recommendedWeight}kg`}
    </td>
  </tr>
);

ExerciseRow.propTypes = {
  difficulty: PropTypes.string.isRequired,
  muscle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  recommendedWeight: PropTypes.string,
  reps: PropTypes.string.isRequired,
  rest: PropTypes.string,
  rpe: PropTypes.string,
  sets: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
};

export default ExerciseRow;