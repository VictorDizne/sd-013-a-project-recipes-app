import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, id, type, className, disabled = false, onClick, buttonText }) => (
  <button
    name={ name }
    id={ id }
    className={ className }
    data-testid={ id }
    type={ type === 'submit' ? 'submit' : 'button' }
    disabled={ disabled }
    onClick={ onClick }
  >
    { buttonText }
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
}.isRequired;

export default Button;
