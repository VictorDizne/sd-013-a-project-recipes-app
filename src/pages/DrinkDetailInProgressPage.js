import React, { useEffect, useState } from 'react';
import * as myFunc from '../services/api';
import * as myFuncHelper from '../services/helpers';
import * as myFuncStorage from '../services/storage';

import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetailInProgressPage({ match }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [details, setDetails] = useState({});
  const [quantity, setQuanitity] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [copySuccess, setCopySuccess] = useState('');
  // const [copySuccess, setCopySuccess] = useState('');
  const [checkDone, setCheckDone] = useState(false);
  const { params: { id } } = match;

  const getIdRecipe = async () => {
    const { drinks } = await myFunc.fetchRecipesDetails(id, 'thecocktaildb');
    setDetails(drinks[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(drinks[0], setQuanitity, setIngredients);
  }

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Drink');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const verifyCheckedInput = (type, ingredient) => {
    const progressRecipesToAddIngredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const verifyIngredient = progressRecipesToAddIngredient[type][id] !== undefined && 
    progressRecipesToAddIngredient[type][id].some((item) => item === ingredient)
    return verifyIngredient
  }

  useEffect(() => {
    getIdRecipe();
    const paramsValue = {
      doneRecipes,
      progressRecipes,
      favoriteRecipes,
      setCheckProgress,
      setCheckFavorite,
      setCheckDone,
      id,
      type: 'cocktails',
    };
    myFuncStorage.setAllLocalStorage(paramsValue);
  }, []);

  const returnListOfIngredients = (index, ingredient) => (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
       id={ ingredient }
       type="checkbox" 
       onClick={ () => myFuncHelper.handleIngredient(ingredient, id, 'cocktails') }
      //  checked = {JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id] !== undefined && 
      //     JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]
      //     .some((item) => item === ingredient)}
      />

      <label
        htmlFor={ ingredient }
        key={ index }           
      >
        {`-${ingredient} - ${quantity[index] !== undefined ? quantity[index] : ''}`}
      </label>
    </div>
  );

  if (details === {}) return <p>Loading...</p>;

  return (
    <div>
      <img
        style={ { width: '50px', height: '50px' } }
        src={ details.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ details.strDrink }
      />

      <h3 data-testid="recipe-title">{details.strDrink}</h3>
      <p data-testid="recipe-category">{details.strCategory}</p>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => myFuncHelper
          .copyToClipBoard(window.location.href, setCopySuccess) }
      >
        <img src={ shareIcon } alt="share-icon" />
        {copySuccess}
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite() }
        src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-icon"
        />
      </button>

      <div>
      {ingredients.map((ingredient, index) => ((
          ingredient !== undefined || ingredient !== null)
          && returnListOfIngredients(index, ingredient)))}
      </div>

      <p data-testid="instructions">{details.strInstructions}</p>

        <Link to='/receitas-feitas'>
          <button type='button' data-testid="finish-recipe-btn">
              Finalizar Receita
          </button>
        </Link>
    </div>
  );
}

export default DrinkDetailInProgressPage;
