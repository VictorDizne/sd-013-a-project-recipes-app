import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ButtonRecipe = ({ isMeal, id }) => {
  const history = useHistory();
  const recipeProgress = () => {
    if (isMeal) return history.push(`/comidas/${id}/in-progress`);
    return history.push(`/bebidas/${id}/in-progress`);
  };

  return (
    <button
      className="btn-down"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ recipeProgress }
    >
      Iniciar Receita
    </button>
  );
};

ButtonRecipe.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default ButtonRecipe;
