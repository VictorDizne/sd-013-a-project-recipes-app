import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';
import { Stack } from '@material-ui/core';
import FavoriteButton from '../components/favoriteButton';
import CardRecomendations from '../components/recomendationCard';
import ShareButton from '../components/shareButton';
import appContext from '../contexts/appContext';
import './css/details.css';
import CommentForm from '../components/commentForm';
import CommentCards from '../components/commentCards';
import listIcon from '../images/list-ingredients.png';
import instructions from '../images/instructions.png';
import video from '../images/video.png';
import recommendation from '../images/recommendation.png';

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
    if (JSON.parse(localStorage.getItem('doneRecipes')) === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
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

  const isDoneRecipe = () => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLocal === null) {
      return false;
    }
    return doneRecipesLocal.some((doneRecipe) => doneRecipe.id === id);
  };

  const buttonStartRecipe = () => {
    // coloca a receita em progresso quando clicamos para iniciar progresso.
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.meals[id]) {
      setInProgress(true);
      return history.push(`/comidas/${id}/in-progress`);
    }

    const meals = {
      ...inProgressRecipes.meals,
      [id]: [],
    };
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes, meals }));
    setInProgress(false);
    return history.push(`/comidas/${id}/in-progress`);
  };

  const URL = meal.strYoutube ? meal.strYoutube.split('=') : '';

  return (
    <main
      style={ { backgroundImage:
    'linear-gradient(to left bottom, #f9683b, #f47442, #ef7f4b, #ea8954, #e5925f)',
      color: '#4c4643' } }
    >
      <Image
        src={ meal.strMealThumb }
        alt={ `${meal.trMeal}` }
        data-testid="recipe-photo"
        fluid
      />
      <Container>
        <Stack
          direction="row"
          spacing={ 16 }
        >
          <div>
            <h2
              data-testid="recipe-title"
              style={ { width: '150px' } }
            >
              {meal.strMeal}
            </h2>
            <p data-testid="recipe-category">{meal.strCategory}</p>
          </div>
          <div>
            <FavoriteButton meal={ meal } />
            <ShareButton dataTestId="share-btn" />
          </div>
        </Stack>
        <h3>
          <img
            src={ listIcon }
            alt="ícone de ingredientes"
            style={ { width: '20px', marginRight: '10px' } }
          />
          Ingredients

        </h3>
        <ul>
          {
            ingredients.map((ingredient, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                { `${ingredient} - ${measures[i]}` }
              </li>
            ))
          }
        </ul>
        <h3>
          <img
            src={ instructions }
            alt="ícone de ingredientes"
            style={ { width: '30px', marginRight: '10px' } }
          />
          Instructions
        </h3>
        <p data-testid="instructions">{meal.strInstructions}</p>
        <h3>
          <img
            style={ { width: '27px', marginRight: '10px' } }
            src={ video }
            alt="ícone de video"
          />
          Video Tutorial
        </h3>
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
        <h3>
          <img
            src={ recommendation }
            alt="ícone de recomendações"
            style={ { width: '32px', marginRight: '10px' } }
          />
          recommendations
        </h3>
        <div className="horizontal-scroll">
          <CardRecomendations
            bColor="#ED9864"
            recomends={ recomendations }
            maxCards={ 6 }
          />
        </div>
        <section>
          <div style={ { marginBottom: '10px' } }>
            <CommentForm id={ id } sendButtonVariant="warning" />
          </div>
          <CommentCards id={ id } noCommentColor="#ED9864" />
        </section>
        <div>
          <button
            type="button"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ () => buttonStartRecipe() }
            data-testid="start-recipe-btn"
            hidden={ isDoneRecipe() }
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </div>
      </Container>
    </main>
  );
}

export default FoodDetails;
