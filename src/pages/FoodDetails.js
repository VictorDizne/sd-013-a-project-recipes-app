import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardRecomendations from '../components/recomendationCard';
import appContext from '../contexts/appContext';
import './css/foodDetails.css';

function FoodDetails() {
  const [meal, setMeal] = useState({});
  const { getIngredients, recipesInProgress, setRecipes } = useContext(appContext);
  const [recomendations, setRecomendations] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      setMeal(meals[0]);
    };
    getMeal();
    const getRecomendations = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setRecomendations(drinks);
    };
    getRecomendations();
  }, [id]);
  /*  console.log(meal); */
  const startRecipe = () => {
    if (!recipesInProgress.includes(id)) {
      setRecipes([...recipesInProgress, id]);
    }

    history.push(`/comidas/${id}/in-progress`);
  };

  const { ingredients, measures } = getIngredients(meal);

  const URL = meal.strYoutube ? meal.strYoutube.split('=') : '';

  return (
    <main>
      <img
        src={ meal.strMealThumb }
        alt={ `${meal.trMeal}` }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <p>{meal.strCategory}</p>
      <h3>Ingredients</h3>
      <ul>
        {
          ingredients.map((ingredient, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              { `${ingredient} - ${measures[i]}` }
            </li>
          ))
        }
      </ul>
      <h3>Instructions</h3>
      <p>{meal.strInstructions}</p>
      <div data-testid="video" className="video-detail">
        <iframe
          width="360"
          height="160"
          src={ `https://www.youtube.com/embed/${URL[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardRecomendations name="bebidas" recomends={ recomendations } maxCards={ 6 } />
      <div>
        <button
          type="button"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ () => startRecipe() }
        >
          { recipesInProgress.includes(id) ? 'Continuar Receita'
            : 'Iniciar Receita'}
        </button>
      </div>
    </main>
  );
}

export default FoodDetails;
