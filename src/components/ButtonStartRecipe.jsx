import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

export default function ButtonStartRecipe(props) {
  const { redirectInProgress } = props;
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="footer"
      onClick={ redirectInProgress }
    >
      Iniciar Receita
    </button>
  );
}

ButtonStartRecipe.propTypes = ({
  redirectInProgress: PropTypes.func.isRequired,
});
