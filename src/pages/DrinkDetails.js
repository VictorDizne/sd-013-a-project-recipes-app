import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import FavoriteButton from '../components/favoriteButton';
import CardRecomendations from '../components/recomendationCard';
import ShareButton from '../components/shareButton';
import appContext from '../contexts/appContext';
import './css/details.css';

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
  }, []);

  useEffect(() => {
    const getDrink = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
      console.log(drinks);
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
    <main>
      <Image
        src={ drink.strDrinkThumb }
        alt={ `${drink.trMeal}` }
        data-testid="recipe-photo"
        fluid
      />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ShareButton dataTestId="share-btn" />
      <FavoriteButton drink={ drink } />
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
      <p data-testid="instructions">{drink.strInstructions}</p>
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

export default DrinkDetail;
