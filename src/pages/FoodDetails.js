import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import { fetchRecommendedDrinks } from '../services/bebidasApi';
import RecomendationCard from '../components/RecomendationCard';
import '../styles/PageDetails.css';

const INITIAL_VALUE = 9;
const MAX_RECOMANDATION = 6;

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const history = useHistory();
  const historyFilter = history.location.pathname;
  const historyId = historyFilter.substr(INITIAL_VALUE);

  // solução feita a partir do repositório
  // https://github.com/tryber/sd-013-a-project-recipes-app/blob/main-group-3-requisito-28/src/components/RecipeDetailCard.jsx
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
        // btnStartRecipe.style.display = 'none';
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

          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <button type="button" data-testid="share-btn">Compartilhar</button>

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
      {/* <div className="button-container"> */}
      <Link
        to={ `/comidas/${historyId}/in-progress` }
        data-testid="start-recipe-btn"
        className="iniciar-receita"
        id="btn-iniciar-receita"
        onClick={ createList }
      >
        Iniciar Receita
      </Link>
      {/* </div> */}
    </div>
  );
}

export default FoodDetails;
