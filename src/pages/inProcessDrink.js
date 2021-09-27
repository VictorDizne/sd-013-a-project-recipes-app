import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appContext from '../contexts/appContext';
import FavoriteButton from '../components/favoriteButton';
import ShareButton from '../components/shareButton';

function ProcessDrink({ props }) {
  const [drink, setDrink] = useState({});
  const [render, setRender] = useState(true);
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();
  const { ingredients } = getIngredients(drink);

  useEffect(() => {
    const getDrink = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
    };
    getDrink();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] }, meals: {},
      }));
    }
  }, []);

  const finishRecipe = () => {
    props.history.push('/receitas-feitas');
  };

  const checkDisable = () => {
    const allCheckBox = document.querySelectorAll('.checkbox');
    console.log(allCheckBox);
  };

  const isChecked = (ingredientName) => {
    const NOT_FOUND = -1;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal.cocktails[id] && ingredientsLocal.cocktails[id]
      .indexOf(ingredientName) === NOT_FOUND) {
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
      const ingredientsNotChecked = ingredientsLocal.cocktails[id]
        .filter((ingredient) => ingredient !== ingredientName);
      const newObject = { ...ingredientsLocal,
        cocktails: { ...oldCocktails, [id]: ingredientsNotChecked } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      setRender(!render);
    } else {
      const oldIngredients = ingredientsLocal.cocktails[id];
      const newObject = { ...ingredientsLocal,
        cocktails: { ...oldCocktails, [id]: [...oldIngredients, ingredientName] } };
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
        disabled={ checkDisable }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      <ShareButton data-testid="share-btn" />
      <FavoriteButton data-testid="favorite-btn" drink={ drink } />
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
