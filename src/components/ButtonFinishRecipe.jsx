import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonFinishRecipe(props) {
  const { stateDisabled } = props;
  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="footer"
        id="finish-recipe-btn"
        disabled={ stateDisabled }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}

ButtonFinishRecipe.propTypes = ({
  stateDisabled: PropTypes.bool.isRequired,
});
