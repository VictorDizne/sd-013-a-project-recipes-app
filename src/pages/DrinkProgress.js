import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinksById } from '../services/bebidasApi';
import { getIngredients, shareDrinkHelper } from '../services/helpers';
import { doneDrinksList,
  favoriteDrinkRecipe, setDrinksProgress } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Progress.css';

function DrinkProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [messageAlert, setMessageAlert] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [ingredientsSave, setIngredientsSave] = useState([]);
  const previousRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  const params = useParams();
  const historyId = params.id;

  useEffect(() => {
    const getRecipe = async () => {
      const drink = await fetchDrinksById(historyId);
      setIngredients(getIngredients(drink));
      setRecipe(drink);
    };
    getRecipe();
  }, [historyId]);

  const shareRecipe = () => {
    shareDrinkHelper(historyId, setMessageAlert);
  };

  const handleLineThrough = (ingredient) => {
    const isIngredientSaved = ingredientsSave.includes(ingredient);

    const newIngredientsSave = isIngredientSaved
      ? ingredientsSave.filter((i) => i !== ingredient)
      : [...ingredientsSave, ingredient];
    setIngredientsSave(newIngredientsSave);

    const isAllIngredientsChecked = ingredients
      .every((ing) => newIngredientsSave.includes(ing));
    setIsActive(isAllIngredientsChecked);

    setDrinksProgress(historyId, newIngredientsSave);
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes && inProgressRecipes.cocktails[historyId]) {
      setIngredientsSave(inProgressRecipes.cocktails[historyId]);
    }
  }, []);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favRecipes.find((item) => item.id === historyId);
    setFavorite(verify);
  }, []);

  const handleClickFavorite = () => {
    favoriteDrinkRecipe(recipe, previousRecipes, favorite, historyId);
    setFavorite(!favorite);
  };

  const handleDoneRecipes = () => {
    const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneDrinksList(recipe, savedDoneRecipes);
    history.push('/receitas-feitas');
  };

  return (
    <div className="drink-container">
      {(recipe.length === 1) && (
        <div>
          <img
            src={ recipe[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt="Imagem da receita"
            width="200"
          />

          <h1 data-testid="recipe-title">{recipe[0].strDrink}</h1>
          <div id="btn-container">
            <p>{messageAlert}</p>
            <button
              type="button"
              onClick={ handleClickFavorite }
            >
              {favorite
                ? <img src={ blackHeartIcon } alt="heart" data-testid="favorite-btn" />
                : <img src={ whiteHeartIcon } alt="noheart" data-testid="favorite-btn" />}
            </button>
            <button type="button" data-testid="share-btn" onClick={ shareRecipe }>
              <img src={ shareIcon } alt="Share Icon" />
            </button>
          </div>
          <p data-testid="recipe-category">{recipe[0].strAlcoholic}</p>
        </div>
      )}

      <h3>Ingredientes</h3>
      {ingredients.map((ingredient, index) => (
        <label
          htmlFor={ `ingredient-${index}` }
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          className={ `${ingredientsSave.includes(ingredient) ? 'line-through' : ''}` }
        >
          <input
            type="checkbox"
            value={ ingredient }
            id={ `ingredient-${index}` }
            checked={ ingredientsSave.includes(ingredient) }
            onChange={ () => handleLineThrough(ingredient) }
          />
          {ingredient}
        </label>
      ))}

      <h3>Instruções</h3>
      {(recipe.length === 1)
        && <p data-testid="instructions">{recipe[0].strInstructions}</p>}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="iniciar-receita"
        id="btn-finalizar-receita"
        onClick={ handleDoneRecipes }
        disabled={ !isActive }

      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinkProgress;
