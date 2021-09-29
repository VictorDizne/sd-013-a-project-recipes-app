import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as myFunc from '../services/api';
import * as myFuncStorage from '../services/storage';
import * as myFuncHelper from '../services/helpers';
import { RecomendedCard, StartRecipeButton } from '../components';

// ICONS
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetailsPage({ match }) {
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

  // const setListOfIngredientsAndQuantity = (meals) => {
  //   const arrayIngredients = [];
  //   const arrayQuantity = [];
  //   const number = 20;
  //   for (let index = 1; index < number; index += 1) {
  //     if (meals[`strIngredient${index}`] !== '') {
  //       arrayIngredients.push(meals[`strIngredient${index}`]);
  //     }
  //     if (meals[`strMeasure${index}`] !== null) {
  //       arrayQuantity.push(meals[`strMeasure${index}`]);
  //     }
  //   }
  //   setQuanitity(arrayQuantity);
  //   setIngredients(arrayIngredients);
  // };

  const requestDetails = async () => {
    const { meals } = await myFunc.fetchRecipesDetails(id, 'themealdb');
    setDetails(meals[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(meals[0], setQuanitity, setIngredients);
  };

  const requestRecomended = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes('thecocktaildb');
    setRecomended(drinks);
  };

  const returnCard = (item, index) => (
    <RecomendedCard
      testid={ `${index}-recomendation-card` }
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      id="idDrink"
      route="bebidas"
      data={ item }
    />
  );

  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  // const copyToClipBoard = async (copyMe) => {
  //   try {
  //     await navigator.clipboard.writeText(copyMe);
  //     setCopySuccess('Link copiado!');
  //   } catch (err) {
  //     setCopySuccess('Failed to copy!');
  //   }
  // };

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const returnListOfIngredients = (index, ingredient) => (
    <p
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`-${ingredient} - ${quantity[index] !== ' ' ? quantity[index] : ''}`}
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
      type: 'meals',
    };
    myFuncStorage.setAllLocalStorage(paramsValue);
  }, []);

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
        {ingredients.map((ingredient, index) => (ingredient !== undefined
          && returnListOfIngredients(index, ingredient)))}
      </div>

      <p data-testid="instructions">{details.strInstructions}</p>
      { details.strYoutube !== undefined && <iframe
        src={ `https://www.youtube.com/embed/${details.strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        data-testid="video"
      /> }
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
        onClick={ () => myFuncStorage.setProgressRecipe(id, 'meals') }
        page="comidas"
        title={ checkProgress }
      />}
    </div>
  );
}

FoodDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetailsPage;
