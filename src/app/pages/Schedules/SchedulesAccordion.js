import _ from 'lodash';
import PropTypes from 'prop-types';

// Components
import { AccordionCard } from 'app/components';

const SchedulesAccordion = ({ schedules }) => {
  if (_.isEmpty(schedules)) return null;

  return (
    <div className="accordion" id="schedule-accordion">
      {_.map(schedules, ({ jsxElement, name }, index) => (
        <AccordionCard heading={name} index={index} parentId="schedule-accordion">
          {jsxElement}
        </AccordionCard>
      ))}
    </div>
  );
};

SchedulesAccordion.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      jsxElement: PropTypes.element.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default SchedulesAccordion;
