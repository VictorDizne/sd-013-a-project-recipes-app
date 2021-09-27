import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StartButton = ({ id, type }) => {
  const inProgressKey = (type === 'comidas') ? 'meals' : 'cocktails';
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const recipeDone = doneRecipes && doneRecipes.some((recipe) => id === recipe.id);
  const inProgress = inProgressRecipes && inProgressRecipes[inProgressKey][id];
  return (
    <Link to={ `/${type}/${id}/in-progress` }>
      <button
        type="button"
        className="fixed-bottom"
        hidden={ recipeDone }
        data-testid="start-recipe-btn"
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar receita'}
      </button>
    </Link>
  );
};

StartButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default StartButton;
