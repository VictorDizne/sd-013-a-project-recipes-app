import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as myFuncApi from '../services/api';
import * as myFuncStorage from '../services/storage';
import * as myFuncHelper from '../services/helpers';
import { RecomendedCard, StartRecipeButton } from '../components';

// ICONES
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetailsPage({ match }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuanitity] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkDone, setCheckDone] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const { params: { id } } = match;
  const LIMITER_FOODS = 6;

  const requestDetails = async () => {
    const { drinks } = await myFuncApi.fetchRecipesDetails(id, 'thecocktaildb');
    setDetails(drinks[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(drinks[0], setQuanitity, setIngredients);
  };

  const requestRecomended = async () => {
    const { meals } = await myFuncApi.fetchRandonRecipes('themealdb');
    setRecomended(meals);
  };

  const returnCard = (item, index) => (
    <RecomendedCard
      testid={ `${index}-recomendation-card` }
      key={ index }
      index={ index }
      thumb="strMealThumb"
      name="strMeal"
      id="idMeal"
      route="comidas"
      data={ item }
    />
  );

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Drink');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const returnListOfIngredients = (index, ingredient) => (
    <p
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`-${ingredient} - ${quantity[index] !== undefined ? quantity[index] : ''}`}
    </p>
  );

  useEffect(() => {
    requestDetails();
    requestRecomended();
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
      <p data-testid="recipe-category">{details.strAlcoholic}</p>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => myFuncHelper
          .copyToClipBoard(`http://localhost:3000/bebidas/${id}`, setCopySuccess) }
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
        <img src={ checkFavorite ? blackHeartIcon : whiteHeartIcon } alt="faviote-icon" />
      </button>

      <div>
        {ingredients.map((ingredient, index) => ((
          ingredient !== undefined || ingredient !== null)
          && returnListOfIngredients(index, ingredient)))}
      </div>

      <p data-testid="instructions">{details.strInstructions}</p>
      <h3>Recomendadas</h3>
      <div
        style={ { display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          width: '100%',
          height: 'auto' } }
      >
        { recomended !== null && recomended.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      { !checkDone
      && <StartRecipeButton
        id={ id }
        onClick={ () => myFuncStorage.setProgressRecipe(id, 'cocktails') }
        page="bebidas"
        title={ checkProgress }
      />}
    </div>
  );
}

DrinkDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetailsPage;
