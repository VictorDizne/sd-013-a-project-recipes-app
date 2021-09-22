import React from 'react';
import PropTypes from 'prop-types';

function Button({ handleClick, testID, disabled }) {
  return (

    <button
      type="button"
      onClick={ handleClick }
      data-testid={ testID }
      disabled={ disabled }
    >
      Entrar
    </button>
  );
}

const { func, string, bool } = PropTypes;

Button.propTypes = {
  handleClick: func,
  testID: string,
  disabled: bool,
}.isRequired;

export default Button;
