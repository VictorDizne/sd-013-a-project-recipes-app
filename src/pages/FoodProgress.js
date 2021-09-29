import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getIngredients } from '../services/helpers';

const INITIAL_VALUE = 9;
const FINAL_VALUE = 5;

function FoodProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const history = useHistory();
  const historyFilter = history.location.pathname;
  const historyId = historyFilter.substr(INITIAL_VALUE, FINAL_VALUE);

  const [messageAlert, setMessageAlert] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchFoodById(historyId);
      setIngredients(getIngredients(meal));
      setRecipe(meal);
      setFavorite(false);// coloquei soh pro lint nao reclamar. É para apagar o setFavorite
    };
    getRecipe();
  }, [historyId]);

  const shareRecipe = () => {
    const url = `http://localhost:3000/comidas/${historyId}`;
    const SET_TIME_OUT = 1000;
    navigator.clipboard.writeText(url);
    setMessageAlert('Link copiado!');
    setTimeout(() => {
      setMessageAlert('');
    }, SET_TIME_OUT);
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
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            {ingredient}
          </li>
        ))}
      </ul>

      <h3>Instruções</h3>
      {(recipe.length === 1)
        && <p data-testid="instructions">{recipe[0].strInstructions}</p>}

      <Link
        to="/receitas-feitas"
        data-testid="finish-recipe-btn"
        className="iniciar-receita"
        id="btn-iniciar-receita"
      >
        Finalizar Receita
      </Link>
    </div>
  );
}

export default FoodProgress;
