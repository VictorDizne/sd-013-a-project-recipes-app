import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as myFunc from '../services/api';
import * as myFuncHelper from '../services/helpers';
import * as myFuncStorage from '../services/storage';

// ICONES
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetailInProgressPage({ match }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [details, setDetails] = useState({});
  const [quantity, setQuanitity] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [copySuccess, setCopySuccess] = useState('');
  const [checkDone, setCheckDone] = useState(false);
  const [checkIngredients, setCheckIngredients] = useState('');
  const [checkAllcheckbox, setCheckAllCheckbox] = useState(true);
  const { params: { id } } = match;

  const getIdRecipe = async () => {
    const { meals } = await myFunc.fetchRecipesDetails(id, 'themealdb');
    setDetails(meals[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(meals[0], setQuanitity, setIngredients);
  };

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

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
      type: 'meals',
      checkDone,
      checkProgress,
    };
    myFuncStorage.setAllLocalStorage(paramsValue);

    if (checkIngredients !== '') {
      setCheckAllCheckbox(!ingredients
        .every((ingredient) => document.getElementById(ingredient).checked));
    }
  }, [checkIngredients, setCheckAllCheckbox]);

  const returnListOfIngredients = (index, ingredient) => (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        id={ ingredient }
        type="checkbox"
        onClick={ () => myFuncHelper
          .handleIngredient(ingredient, id, 'meals', setCheckIngredients) }
        checked={ progressRecipes.meals[id].some((item) => item === ingredient) }
      />
      <label
        htmlFor={ ingredient }
        key={ index }
      >
        { `-${ingredient} - ${quantity[index] !== ' ' ? quantity[index] : ''}` }
      </label>
    </div>
  );

  if (details === {}) return <p>Loading...</p>;

  return (
    <div>
      <img
        style={ { width: '50px', height: '50px' } }
        src={ details.strMealThumb }
        data-testid="recipe-photo"
        alt={ details.strMeal }
      />

      <h3 data-testid="recipe-title">{details.strMeal}</h3>
      <p data-testid="recipe-category">{details.strCategory}</p>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => myFuncHelper
          .copyToClipBoard(`http://localhost:3000/comidas/${id}`, setCopySuccess) }
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
        {ingredients.map((ingredient, index) => (
          (ingredient !== undefined && ingredient !== null)
          && returnListOfIngredients(index, ingredient)))}
      </div>

      <p data-testid="instructions">{details.strInstructions}</p>

      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checkAllcheckbox }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

FoodDetailInProgressPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetailInProgressPage;
