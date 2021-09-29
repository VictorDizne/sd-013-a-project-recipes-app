import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

export default function ButtonContinueRecipe(props) {
  const { redirectInProgress } = props;
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="footer"
      onClick={ redirectInProgress }
    >
      Continuar Receita
    </button>
  );
}

ButtonContinueRecipe.propTypes = ({
  redirectInProgress: PropTypes.func.isRequired,
});
