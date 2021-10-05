import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDrinksById } from '../services/bebidasApi';
import { fetchRecommendedMeals } from '../services/comidasApi';
import { getIngredients, shareDrinkHelper } from '../services/helpers';
import { favoriteDrinkRecipe } from '../services/localStorage';
import RecomendationCard from '../components/RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/PageDetails.css';

const MAX_RECOMANDATION = 6;

function DrinkDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [messageAlert, setMessageAlert] = useState('');
  const [favorite, setFavorite] = useState(false);
  const params = useParams();
  const historyId = params.id;
  const previousRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];

  useEffect(() => {
    const verify = savedDoneRecipes.some((item) => item.id === historyId);
    const btnStartRecipe = document.getElementById('btn-iniciar-receita');
    btnStartRecipe.hidden = verify;
  }, []);

  useEffect(() => {
    const getRecipe = async () => {
      const drink = await fetchDrinksById(historyId);
      setIngredients(getIngredients(drink));
      setRecipe(drink);
    };
    getRecipe();
  }, [historyId]);

  useEffect(() => {
    const getRecomendations = async () => {
      const recommendedRecipes = await fetchRecommendedMeals();
      setRecomendation(recommendedRecipes);
    };
    getRecomendations();
  }, []);

  const shareRecipe = () => {
    shareDrinkHelper(historyId, setMessageAlert);
  };

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favRecipes.find((item) => item.id === historyId);
    setFavorite(verify);
  }, []);

  const handleClickFavorite = () => {
    favoriteDrinkRecipe(recipe, previousRecipes, favorite, historyId);
    setFavorite(!favorite);
  };

  const isDrinkInProgress = () => (
    !!inProgressRecipes.cocktails && !!inProgressRecipes.cocktails[historyId]);

  const isDrinkDone = () => !!savedDoneRecipes[historyId];

  return (
    <div>
      { (recipe.length === 1) && (
        <div className="page-container">
          <img
            src={ recipe[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt="Imagem da receita"
            width="200"
          />

          <h1 data-testid="recipe-title">{ recipe[0].strDrink }</h1>
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
          <p data-testid="recipe-category">{ recipe[0].strAlcoholic }</p>
        </div>
      )}

      <h3>Ingredientes</h3>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        )) }
      </ul>

      <h3>Instruções</h3>
      { (recipe.length === 1)
        && <p data-testid="instructions">{ recipe[0].strInstructions }</p> }

      <h3>Recomendadas</h3>
      <div className="recomandation-container">
        { recomendation.slice(0, MAX_RECOMANDATION).map((rec, idx) => (
          <RecomendationCard
            key={ idx }
            recipe={ rec }
            idx={ idx }
            page="drinks"
          />
        ))}
      </div>
      <Link
        to={ `/bebidas/${historyId}/in-progress` }
        data-testid="start-recipe-btn"
        className={ isDrinkDone() ? 'btn-none' : 'iniciar-receita' }
        id="btn-iniciar-receita"
      >
        {isDrinkInProgress()
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </Link>
    </div>
  );
}

export default DrinkDetails;
