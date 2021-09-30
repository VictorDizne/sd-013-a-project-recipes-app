import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import FavoriteButton from '../components/favoriteButton';
import CardRecomendations from '../components/recomendationCard';
import ShareButton from '../components/shareButton';
import appContext from '../contexts/appContext';
import './css/details.css';

function FoodDetails() {
  const [meal, setMeal] = useState({});
  const { getIngredients } = useContext(appContext);
  const [recomendations, setRecomendations] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { ingredients, measures } = getIngredients(meal);

  useEffect(() => {
    // ao entrar na page, ele verifica se os localStorages estão setados ou n,
    // se não estiver, será setado.
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {}, meals: {},
      }));
    }
  }, []);

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

    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (meals[id]) { // verifica se a comida está em progresso.
      return setInProgress(true);
    }
  }, [id]);

  const buttonStartRecipe = () => {
    // coloca a receita em progresso quando clicamos para iniciar progresso.
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.meals[id]) {
      setInProgress(true);
      return history.push(`/comidas/${id}/in-progress`);
    }

    const meals = {
      ...inProgressRecipes.meals,
      [id]: ingredients,
    };
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes, meals }));
    setInProgress(false);
    return history.push(`/comidas/${id}/in-progress`);
  };

  const URL = meal.strYoutube ? meal.strYoutube.split('=') : '';

  return (
    <main>
      <Image
        src={ meal.strMealThumb }
        alt={ `${meal.trMeal}` }
        data-testid="recipe-photo"
        fluid
      />
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <p data-testid="recipe-category">{meal.strCategory}</p>
      <ShareButton dataTestId="share-btn" />
      <FavoriteButton meal={ meal } />
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
      <p data-testid="instructions">{meal.strInstructions}</p>
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
      <div className="horizontal-scroll">
        <CardRecomendations name="bebidas" recomends={ recomendations } maxCards={ 6 } />
      </div>
      <div>
        <button
          type="button"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ () => buttonStartRecipe() }
          data-testid="start-recipe-btn"
        >
          { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </div>
    </main>
  );
}

export default FoodDetails;
