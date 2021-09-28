import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

const StartRecipeBtn = ({ history, recipe, isMeal }) => {
  const { btnText } = useContext(RecipesContext);

  const handleStartRecipeBtn = () => {
    history.push(isMeal ? `/comidas/${recipe.idMeal}/in-progress`
      : `/bebidas/${recipe.idDrink}/in-progress`);
  };

  return (
    <button
      className="start-recipe-btn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeBtn }
    >
      {btnText}
    </button>
  );
};

StartRecipeBtn.propTypes = {
  recipe: PropTypes.shape({
    strTags: PropTypes.string,
    strMeal: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StartRecipeBtn;
