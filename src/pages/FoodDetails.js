import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import { fetchRecommendedDrinks } from '../services/bebidasApi';
import RecomendationCard from '../components/RecomendationCard';
import '../styles/PageDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const INITIAL_VALUE = 9;
const MAX_RECOMANDATION = 6;

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [messageAlert, setMessageAlert] = useState('');
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const historyFilter = history.location.pathname;
  const historyId = historyFilter.substr(INITIAL_VALUE);
  // solução feita a partir do repositório https://github.com/tryber/sd-013-a-project-recipes-app/blob/main-group-3-requisito-28/src/components/RecipeDetailCard.jsx
  const getIngredients = (meal) => {
    const strMeal = Object.entries(meal[0]);
    const strIngredient = strMeal.filter(([key, value]) => key
      .includes('strIngredient') && value);
    const strMeasure = strMeal.filter(([key, value]) => key
      .includes('strMeasure') && value);
    return strIngredient.map((item, index) => `${item[1]} - ${strMeasure[index][1]}`);
  };
  useEffect(() => {
    const previousRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (previousRecipes) {
      const verify = previousRecipes.some((item) => item.id === historyId);
      if (verify) {
        const btnStartRecipe = document.getElementById('btn-iniciar-receita');
        btnStartRecipe.hidden = true;
      }
    }
  }, []);
  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchFoodById(historyId);
      setIngredients(getIngredients(meal));
      setRecipe(meal);
    };
    getRecipe();
  }, [historyId]);
  useEffect(() => {
    const getRecomendations = async () => {
      const recomemendedRecipes = await fetchRecommendedDrinks();
      setRecomendation(recomemendedRecipes);
    };
    getRecomendations();
  }, []);
  const createList = () => {
    let doneRecipes = [];
    const previousRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = `${day}/${month}/${year}`;
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe[0];
    const tagsArray = (strTags === null) ? [] : strTags.split(',');
    console.log(recipe);
    if (previousRecipes) {
      doneRecipes = [
        ...previousRecipes,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
          doneDate: date,
          tags: tagsArray,
        },
      ];
    } else {
      doneRecipes = [
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
          doneDate: date,
          tags: tagsArray,
        },
      ];
    }

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  };

  const shareRecipe = () => {
    const url = `http://localhost:3000/comidas/${historyId}`;
    const SET_TIME_OUT = 1000;
    // window.prompt('Link copiado!', url);
    navigator.clipboard.writeText(url);
    setMessageAlert('Link copiado!');
    setTimeout(() => {
      setMessageAlert('');
    }, SET_TIME_OUT);
  };

  const favoriteRecipe = () => {
    let favoriteRecipes = [];
    const previousRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe[0];
    if (previousRecipes) {
      favoriteRecipes = [
        ...previousRecipes,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
    } else {
      favoriteRecipes = [
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
    }

    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    if (favorite) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removeRecipe = favRecipes
        .filter((favRecipe) => favRecipe.id !== historyId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favRecipes) {
      const verify = favRecipes.find((item) => item.id === historyId);

      if (verify) {
        setFavorite(true);
      }
    }
  }, []);

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
              onClick={ favoriteRecipe }
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
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>

      <h3>Instruções</h3>
      {(recipe.length === 1)
        && <p data-testid="instructions">{recipe[0].strInstructions}</p>}

      <h3>Video</h3>
      {(recipe.length === 1)
        && recipe[0].strYoutube
        && (<iframe
          width="425"
          height="350"
          src={ recipe[0].strYoutube.replace('watch?v=', 'embed/') }
          title={ recipe[0].strMeal }
          data-testid="video"
        />)}
      <h3>Recomendadas</h3>
      <div className="recomandation-container">
        {recomendation.slice(0, MAX_RECOMANDATION).map((rec, idx) => (
          <RecomendationCard
            key={ idx }
            recipe={ rec }
            idx={ idx }
            page="meals"
          />
        ))}
      </div>
      <Link
        to={ `/comidas/${historyId}/in-progress` }
        data-testid="start-recipe-btn"
        className="iniciar-receita"
        id="btn-iniciar-receita"
        onClick={ createList }
      >
        Iniciar Receita
      </Link>
    </div>
  );
}

export default FoodDetails;
