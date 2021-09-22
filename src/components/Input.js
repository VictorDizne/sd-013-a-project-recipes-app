import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, labelText, inputType, testID, handleChange }) => (
  <label htmlFor={ name }>
    {labelText}
    <input
      id={ name }
      name={ name }
      type={ inputType }
      data-testid={ testID }
      onChange={ handleChange }
    />
  </label>
);

const { string, func } = PropTypes;

Input.propTypes = {
  name: string,
  labelText: string,
  inputType: string,
  testID: string,
  handleChange: func,
}.isRequired;

export default Input;
