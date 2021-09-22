import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, labelText, inputType, testID, handleChange, value }) => (
  <label htmlFor={ name }>
    {labelText}
    <input
      id={ name }
      name={ name }
      value={ value }
      type={ inputType }
      data-testid={ testID }
      onChange={ handleChange }
    />
  </label>
);

const { string, func } = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  value: string,
  labelText: string.isRequired,
  inputType: string.isRequired,
  testID: string,
  handleChange: func.isRequired,
};

Input.defaultProps = {
  value: undefined,
  testID: undefined,
};

export default Input;
