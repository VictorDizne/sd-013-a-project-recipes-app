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
import CommentCards from '../components/commentCards';
import CommentForm from '../components/commentForm';
import drinkIcon from '../images/drink.png';
import instructionIcon from '../images/drink-instructions.png';
import videoIcon from '../images/drink-video.png';
import recommendationDrinkIcon from '../images/recommendation-drink.png';

function DrinkDetail() {
  const [drink, setDrink] = useState({});
  const { getIngredients } = useContext(appContext);
  const [recomendations, setRecomendations] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { ingredients, measures } = getIngredients(drink);

  useEffect(() => {
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
    const getDrink = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
    };
    getDrink();
    const getRecomendations = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const { meals } = await response.json();
      setRecomendations(meals);
    };
    getRecomendations();

    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (cocktails[id]) {
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

  const buttonStartRecipe = () => { // desenvolver essa função
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.cocktails[id]) {
      setInProgress(true);
      return history.push(`/bebidas/${id}/in-progress`);
    }

    const cocktails = {
      ...inProgressRecipes.cocktails,
      [id]: [],
    };
    console.log({ ...inProgressRecipes, cocktails });
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes, cocktails }));
    setInProgress(false);
    return history.push(`/bebidas/${id}/in-progress`);
  };

  const URL = drink.strYoutube ? drink.strYoutube.split('=') : '';

  return (
    <main
      style={ {
        backgroundImage:
        'linear-gradient(to left bottom, #530c17, #690832, #781255, #792980, #6145ae)',
        color: '#cbaada',
      } }
    >
      <Image
        src={ drink.strDrinkThumb }
        alt={ `${drink.trMeal}` }
        data-testid="recipe-photo"
        style={ { marginBottom: '10px' } }
        fluid
      />
      <Container fluid>
        <Stack
          direction="row"
          spacing={ 16 }
        >
          <div>
            <h4
              data-testid="recipe-title"
              style={ { width: '150px' } }
            >
              {drink.strDrink}
            </h4>
            <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          </div>
          <div>
            <FavoriteButton drink={ drink } />
            <ShareButton dataTestId="share-btn" />
          </div>
        </Stack>
        <h3>
          <img
            src={ drinkIcon }
            alt="ícone de ingredientes da bebida"
            style={ { width: '32px', marginRight: '5px' } }
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
            src={ instructionIcon }
            alt="ícone de instruções"
            style={ { width: '32px', marginRight: '5px' } }
          />
          Instructions
        </h3>
        <p data-testid="instructions">{drink.strInstructions}</p>
        <h3>
          <img
            src={ videoIcon }
            alt="ícone de ingredientes"
            style={ { width: '36px', marginRight: '5px' } }
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
            src={ recommendationDrinkIcon }
            alt="ícone de ingredientes"
            style={ { width: '36px', marginRight: '5px' } }
          />
          recommendations
        </h3>
        <div className="horizontal-scroll">
          <CardRecomendations
            bColor="#bb8ecd"
            recomends={ recomendations }
            maxCards={ 6 }
          />
        </div>
        <section>
          <div style={ { marginBottom: '10px' } }>
            <CommentForm id={ id } sendButtonVariant="secondary" />
          </div>
          <CommentCards id={ id } noCommentColor="#9B5AB9" />
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

export default DrinkDetail;
