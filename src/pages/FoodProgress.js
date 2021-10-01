import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import { getIngredients,
  doneMealsList, favoriteMealRecipe, shareMealHelper } from '../services/helpers';
import { setMealsProgress } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Progress.css';

function FoodProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [messageAlert, setMessageAlert] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [ingredientsSave, setIngredientsSave] = useState([]);
  const previousRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const params = useParams(); // esse metodo ja retira da url somente o id
  const historyId = params.id;

  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchFoodById(historyId);
      setIngredients(getIngredients(meal));
      setRecipe(meal);
    };
    getRecipe();
  }, [historyId]);

  const shareRecipe = () => {
    shareMealHelper(historyId, setMessageAlert);
  };

  const handleLineThrough = (ingredient) => {
    // verifica se o ingrediente clicado já está na lista de ingredientes salvos
    const isIngredientSaved = ingredientsSave.includes(ingredient);

    // O ingrediente esta na lista de ingredientes salvos?
    const newIngredientsSave = isIngredientSaved
      ? ingredientsSave.filter((i) => i !== ingredient) // remove da lista se ingrediente ja está na lista
      : [...ingredientsSave, ingredient]; // adiciona na lista
    setIngredientsSave(newIngredientsSave);

    setMealsProgress(historyId, newIngredientsSave);
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes && inProgressRecipes.meals[historyId]) {
      setIngredientsSave(inProgressRecipes.meals[historyId]);
    }
  }, []);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favRecipes.find((item) => item.id === historyId);
    setFavorite(verify);
  }, []);

  const handleClickFavorite = () => {
    favoriteMealRecipe(recipe, previousRecipes, favorite, historyId);
    setFavorite(!favorite);
  };

  const handleDoneRecipes = () => {
    const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneMealsList(recipe, savedDoneRecipes);
  };

  return (
    <div className="food-container">
      {(recipe.length === 1) && (
        <div>
          <img
            src={ recipe[0].strMealThumb }
            data-testid="recipe-photo"
            alt="Imagem da receita"
            width="200"
          />

          <h1 data-testid="recipe-title">{recipe[0].strMeal}</h1>
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
          <p data-testid="recipe-category">{recipe[0].strCategory}</p>
        </div>
      )}

      <h3>Ingredientes</h3>
      <div id="ingredients-container">
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            className={ `${ingredientsSave.includes(ingredient) ? 'line-through' : ''}` }
          >
            <input
              type="checkbox"
              value={ ingredient }
              id={ ingredient }
              checked={ ingredientsSave.includes(ingredient) }
              onChange={ () => handleLineThrough(ingredient) }
            />
            {ingredient}
          </label>
        ))}
      </div>

      <h3>Instruções</h3>
      {(recipe.length === 1)
        && <p data-testid="instructions">{recipe[0].strInstructions}</p>}

      <Link
        to="/receitas-feitas"
        data-testid="finish-recipe-btn"
        className="iniciar-receita"
        id="btn-iniciar-receita"
        onClick={ handleDoneRecipes }
      >
        Finalizar Receita
      </Link>
    </div>
  );
}

export default FoodProgress;
