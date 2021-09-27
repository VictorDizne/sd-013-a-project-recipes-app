import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/comidasApi';
import { fetchRecommendedDrinks } from '../services/bebidasApi';
import RecomendationCard from '../components/RecomendationCard';
import '../styles/Food.css';

const INITIAL_VALUE = 9;
const MAX_RECOMANDATION = 6;

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const history = useHistory();
  const historyFilter = history.location.pathname;
  const historyId = historyFilter.substr(INITIAL_VALUE);

  const fillIngredients = (meal) => {
    const strMeal = Object.entries(meal[0]);
    const strIngredient = strMeal.filter(([chave, valor]) => chave
      .includes('strIngredient') && valor);

    const strMeasure = strMeal.filter(([chave, valor]) => chave
      .includes('strMeasure') && valor);

    return strIngredient.map((item, index) => `${item[1]} - ${strMeasure[index][1]}`);
  };

  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchFoodById(historyId);
      setIngredients(fillIngredients(meal));
      setRecipe(meal);
    };
    getRecipe();
  }, [historyId]);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  useEffect(() => {
    const getRecomendations = async () => {
      const recomemendedRecipes = await fetchRecommendedDrinks();
      setRecomendation(recomemendedRecipes);
    };
    getRecomendations();
  }, []);

  useEffect(() => {
    console.log(recomendation, 'recomendation');
  }, [recomendation]);

  return (
    <div className="food-container">
      { (recipe.length === 1) && (
        <div>
          <img
            src={ recipe[0].strMealThumb }
            data-testid="recipe-photo"
            alt="Imagem da receita"
            width="200"
          />

          <h1 data-testid="recipe-title">{ recipe[0].strMeal }</h1>

          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <button type="button" data-testid="share-btn">Compartilhar</button>

          <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
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

      <h3>Video</h3>
      { (recipe.length === 1)
        && recipe[0].strYoutube
        && (<iframe
          width="425"
          height="350"
          src={ recipe[0].strYoutube.replace('watch?v=', 'embed/') }
          title={ recipe[0].strMeal }
          data-testid="video"
        />)}

      { recomendation.slice(0, MAX_RECOMANDATION).map((rec, idx) => (
        <RecomendationCard
          key={ idx }
          recipe={ rec }
          idx={ idx }
          page="meals"
        />
      ))}

      <Link to={ `/comidas/${historyId}/in-progress` } data-testid="start-recipe-btn">
        Iniciar Receita
      </Link>
    </div>
  );
}

export default FoodDetails;
