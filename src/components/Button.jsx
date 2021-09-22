import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, type, className, disabled, onClick }) => {
  return (
    <button
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
};

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}.isRequired;

export default Button;
