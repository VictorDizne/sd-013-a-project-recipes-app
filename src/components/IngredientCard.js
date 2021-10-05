import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import RecipesContext from '../context/index';

const IngredientCard = ({ ingredient, idx, page }) => {
  const foodIngredientImage = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
  const drinkIngredientImage = (
    `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`);

  const { setIngredient } = useContext(RecipesContext);
  const history = useHistory();

  const sendToFoodsPage = (ing) => {
    setIngredient(ing);
    history.push('/comidas');
  };

  const sendToDrinksPage = (ing) => {
    setIngredient(ing);
    history.push('/bebidas');
  };

  if (page === 'foods') {
    return (
      <button
        type="button"
        onClick={ () => sendToFoodsPage(ingredient.strIngredient) }
        data-testid={ `${idx}-ingredient-card` }
      >
        <img
          src={ foodIngredientImage }
          alt={ `Imagem de ${ingredient.strIngredient}` }
          data-testid={ `${idx}-card-img` }
        />

        <h2 data-testid={ `${idx}-card-name` }>{ingredient.strIngredient}</h2>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={ () => sendToDrinksPage(ingredient.strIngredient1) }
      data-testid={ `${idx}-ingredient-card` }
    >
      <img
        src={ drinkIngredientImage }
        alt={ `Imagem de ${ingredient.strIngredient1}` }
        data-testid={ `${idx}-card-img` }
      />

      <h2 data-testid={ `${idx}-card-name` }>{ingredient.strIngredient1}</h2>
    </button>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.object,
  idx: PropTypes.number,
  page: PropTypes.string,
}.isRequired;

export default IngredientCard;
