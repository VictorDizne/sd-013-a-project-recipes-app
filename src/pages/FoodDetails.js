import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import { fetchRecommendedDrinks } from '../services/bebidasApi';
import RecomendationCard from '../components/RecomendationCard';
import '../styles/PageDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getIngredients, createDate, favoriteRecipe } from '../services/helpers';

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
  const previousRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  useEffect(() => {
    const verify = savedDoneRecipes.some((item) => item.id === historyId);
    const btnStartRecipe = document.getElementById('btn-iniciar-receita');
    btnStartRecipe.hidden = verify;
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
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe[0];
    const tagsArray = (strTags === null) ? [] : strTags.split(',');
    if (savedDoneRecipes) {
      doneRecipes = [
        ...savedDoneRecipes,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
          doneDate: createDate(),
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
          doneDate: createDate(),
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

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favRecipes.find((item) => item.id === historyId);
    setFavorite(verify);
  }, []);

  const handleClick = () => {
    favoriteRecipe(recipe, previousRecipes, favorite, historyId);
    setFavorite(!favorite);
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
              onClick={ handleClick }
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
