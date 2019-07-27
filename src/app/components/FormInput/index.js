import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import InputControl from './InputControl';
import SelectControl from './SelectControl';

const FormInput = ({ id, inline, inlineLabelClass, label, selectData, type, ...restProps }) => {
  const controlElement =
    type === 'select' && !_.isEmpty(selectData) ? (
      <SelectControl id={id} selectData={selectData} {...restProps} />
    ) : (
      <InputControl id={id} type={type} {...restProps} />
    );

  if (inline) {
    const labelClassName = _.compact(['col-2', 'col-form-label', inlineLabelClass]).join(' ');

    return (
      <div className="form-group row">
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
        <div className="col">{controlElement}</div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {controlElement}
    </div>
  );
};

FormInput.propTypes = {
  ...InputControl.propTypes,
  ...SelectControl.propTypes,
  inline: PropTypes.bool,
  inlineLabelClass: PropTypes.string,
  label: PropTypes.string.isRequired,
};

FormInput.defaultProps = {
  ...InputControl.defaultProps,
  inline: false,
  type: 'text',
};

export default FormInput;
