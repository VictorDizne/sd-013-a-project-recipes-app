import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';
import { RecomendedCard, StartRecipeButton } from '../components';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg'
import blackHeartIcon from '../images/blackHeartIcon.svg'

const copy = require('clipboard-copy');

function FoodDetailsPage({ location }) {
  const { myPage } = useContext(MyContext);
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuanitity] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [ checkProgress, setCheckProgress ] = useState(false);
  const [checkFavorite, setCheckFavorite ] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const LIMITER_FOODS = 6;

  const requestDetails = async () => {
    console.log(location.pathname.split('/')[2]);
    const { meals } = await myFunc.fetchRecipesDetails(
      location.pathname.split('/')[2],
      'themealdb',
    );
    setDetails(meals);
    const array = [];
    const arrayQuantity = [];
    const number = 20;
    for (let index = 1; index < number; index += 1) {
      if (meals[0][`strIngredient${index}`] !== '') {
        array.push(meals[0][`strIngredient${index}`]);
      }
      if (meals[0][`strMeasure${index}`] !== null) {
        arrayQuantity.push(meals[0][`strMeasure${index}`]);
      }
    }
    setQuanitity(arrayQuantity);
    setIngredients(array);
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

  const setProgressRecipe = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newProgressRecipe = {
      ...progressRecipe,
      meals: {
        ...progressRecipe.meals,
        [location.pathname.split('/')[2]]: ['lista-de-ingredientes-utilizados'],
      },
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipe));
  }

  const checkProgressRecipe = (id) => {
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setCheckProgress(Object.keys(meals).some((recipeId) => recipeId === id ));
  }

  const setLocalStorage = () => {
    const progressRecipe = {
      cocktails: {},
      meals: {},
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }

  // FAVORITE RECIPE LOCAL STORAGE
  const setFavoriteRecipe = (id) => {
    const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const check = result.some((item) => item.id === id)
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let newFavoriteRecipe = []
    if (check) {
      newFavoriteRecipe = favoriteRecipe.filter((item) => item.id !== id )
    } else {
      newFavoriteRecipe = [
        ...favoriteRecipe,
        {
          id: details[0].idMeal, 
          type: 'comida',
          area: details[0].strArea,
          category: details[0].strCategory,
          alcoholicOrNot: '',
          name: details[0].strMeal,
          image: details[0].strMealThumb,
        }
      ];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));
    checkFavoriteRecipe(id)
  }

  const setFavoriteRecipeLocalStorage = () => {
    const favoriteRecipe = []
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
  }

  const checkFavoriteRecipe = (id) => {
    const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setCheckFavorite(result.some((item) => item.id === id));
  }


  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Link copiado!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  useEffect(() => {
    requestDetails();
    requestRecomended();
    
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ( !progressRecipe ) {
      setLocalStorage()
    } else {      
      checkProgressRecipe(location.pathname.split('/')[2]);
    }

    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if ( !favoriteRecipe ) {
      setFavoriteRecipeLocalStorage()
    } else {
      checkFavoriteRecipe(location.pathname.split('/')[2]);
    }
  }, []);

  if (!details.length) return <p>Loading...</p>;

  return (
    <div>
      <img
        style={ { width: '50px', height: '50px' } }
        src={ details[0].strMealThumb }
        data-testid="recipe-photo"
        alt={ details[0].strMeal }
      />

      <h3 data-testid="recipe-title">{details[0].strMeal}</h3>
      <p data-testid="recipe-category">{details[0].strCategory}</p>

      <button
        type="button"
        data-testid="share-btn"
        onClick={() => copyToClipBoard(window.location.href)}
      >
        <img src={shareIcon} alt="share-icon" />
        {copySuccess}
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavoriteRecipe(location.pathname.split('/')[2]) }
        src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
      > <img src={ checkFavorite ? blackHeartIcon  : whiteHeartIcon } />   
      </button>

      <div>
        {ingredients.map((ingredient, index) => (ingredient !== undefined
            && <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>{`-${ingredient} - ${quantity[index] !== undefined ? quantity[index] : ''}`}</p>))}
      </div>

      <p data-testid="instructions">{details[0].strInstructions}</p>
      { details[0].strVideo !== null && <iframe
        src={ `https://www.youtube.com/embed/${details[0].strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        data-testid="video"
      /> }
      <h3>Recomendadas</h3>
      <div style={ { display: 'flex', flexDirection: 'row', overflowX: 'scroll', width: '100%', height: 'auto' } }>
        { recomended !== null && recomended.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      { checkProgress === false 
        ? <StartRecipeButton 
          id={location.pathname.split('/')[2]}
          onClick={ () => setProgressRecipe() }
          page="comidas"
          title="Iniciar Receita"
        />
        : <StartRecipeButton 
          id={location.pathname.split('/')[2]}
          onClick={ () => setProgressRecipe() }
          page="comidas"
          title="Continuar Receita"
        />
      }
    </div>
  );
}

export default FoodDetailsPage;
