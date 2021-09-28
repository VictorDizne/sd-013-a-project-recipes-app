import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import appContext from '../contexts/appContext';
import FavoriteButton from '../components/favoriteButton';
import ShareButton from '../components/shareButton';

function ProcessDrink() {
  const [drink, setDrink] = useState({});
  const [render, setRender] = useState(true);
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();
  const history = useHistory();
  const { ingredients } = getIngredients(drink);

  useEffect(() => {
    const getDrink = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
    };
    getDrink();
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] }, meals: {},
      }));
    }
  }, []);

  const isFinishDisabled = () => {
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal === null) {
      return false;
    }
    const currentIngredients = ingredientsLocal.cocktails[id];
    return (currentIngredients.length === ingredients.length);
  };

  const finishRecipe = () => {
    return history.push('/receitas-feitas');
  };

  const isChecked = (ingredientName) => {
    const NOT_FOUND = -1;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal.cocktails[id] && ingredientsLocal.cocktails[id]
      .indexOf(ingredientName) !== NOT_FOUND) {
      return true;
    }
    return false;
  };

  const onChangeIngredient = (isMarked, ingredientName) => {
    const input = document.getElementById(ingredientName);
    input.checked = isMarked;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const oldCocktails = ingredientsLocal.cocktails;
    if (isMarked) {
      const oldIngredients = ingredientsLocal.cocktails[id];
      const newObject = { ...ingredientsLocal,
        cocktails: { ...oldCocktails, [id]: [...oldIngredients, ingredientName] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      setRender(!render);
    } else {
      const ingredientsNotChecked = ingredientsLocal.cocktails[id]
        .filter((ingredient) => ingredient !== ingredientName);
      const newObject = { ...ingredientsLocal,
        cocktails: { ...oldCocktails, [id]: ingredientsNotChecked } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      setRender(!render);
    }
  };
  return (
    <div>
      <h1>bebida em processo</h1>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
      <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
      {ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
        >
          { ingredient }
          <input
            className="checkbox"
            type="checkbox"
            id={ ingredient }
            value={ ingredient }
            name="ingredients"
            checked={ isChecked(ingredient) }
            onChange={ (e) => onChangeIngredient(e.target.checked, e.target.value) }
          />
        </label>
      ))}
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isFinishDisabled() }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      <ShareButton />
      <FavoriteButton drink={ drink } />
    </div>
  );
}

ProcessDrink.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }).isRequired,
  history: PropTypes.shape().isRequired,
};

export default ProcessDrink;
