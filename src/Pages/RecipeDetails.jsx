import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import RecomendationCards from '../Components/RecomendationCard';
import ButtonRecipe from '../Components/ButtonRecipe';
import whiteHeartIcon from '../Images/whiteHeartIcon.svg';
import blackHeartIcon from '../Images/blackHeartIcon.svg';
import shareIcon from '../Images/shareIcon.svg';
import useApiId from '../Hooks/useApiId';
import useFetchApi from '../Hooks/useFetchApi';
import youtubeLink from '../services/YoutubeLink';
import '../Styles/btn-down.css';
import '../Styles/RecipeDetails.css';

function verifyFunction(VINTE, data, arrayIngredients, arrayMeasures) {
  for (let i = 1; i < VINTE; i += 1) {
    if (data[`strIngredient${i}`] !== null
      && data[`strIngredient${i}`] !== ''
      && data[`strIngredient${i}`] !== undefined) {
      arrayIngredients.push(data[`strIngredient${i}`]);
    }
    if (data[`strMeasure${i}`] !== null
      && data[`strMeasure${i}`] !== ''
      && data[`strMeasure${i}`] !== undefined) {
      arrayMeasures.push(data[`strMeasure${i}`]);
    }
  }
}

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();

  const pathnameCheck = (pathnameParam) => {
    switch (pathnameParam) {
    case `/comidas/${id}`:
      return 'themealdb';
    case `/bebidas/${id}`:
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const [data, isMeal] = useApiId(pathnameCheck(pathname), id);
  const [favButton, setFavButton] = useState(false);
  const [showFavButton, setShowFavButton] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const arrayMeasures = [];
  const arrayIngredients = [];
  const VINTE = 20;

  verifyFunction(VINTE, data, arrayIngredients, arrayMeasures);

  const pathnameReverse = isMeal
    ? pathnameCheck(`/bebidas/${id}`)
    : pathnameCheck(`/comidas/${id}`);
  const recomendationData = useFetchApi(pathnameReverse);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setShareButton(true);
  };

  const verifyFavorite = () => {
    if (localStorage.favoriteRecipes) {
      const recipes = JSON.parse(localStorage.favoriteRecipes);
      return recipes.some((recipe) => recipe.id === id);
    }
    return false;
  };

  const unCheckFavorite = () => {
    const parse = JSON.parse(localStorage.favoriteRecipes);
    const unFav = parse.filter((recipe) => recipe.id !== id);
    localStorage.favoriteRecipes = JSON.stringify(unFav);
    return setFavButton(false);
  };

  const checkFavorite = () => {
    const fav = {
      id: isMeal ? data.idMeal : data.idDrink,
      type: isMeal ? 'comida' : 'bebida',
      area: isMeal ? data.strArea : '',
      category: data.strCategory,
      alcoholicOrNot: isMeal ? '' : data.strAlcoholic,
      name: isMeal ? data.strMeal : data.strDrink,
      image: isMeal ? data.strMealThumb : data.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const parse = JSON.parse(localStorage.favoriteRecipes);
      localStorage.favoriteRecipes = JSON.stringify([...parse, (fav)]);
      return setFavButton(true);
    }
    localStorage.favoriteRecipes = JSON.stringify([fav]);
    // return setFavButton(true);
  };

  const onFavoriteClick = () => (verifyFavorite() ? unCheckFavorite() : checkFavorite());

  return (
    <div>
      <h1>RecipeDetails</h1>

      <div>
        <img
          data-testid="recipe-photo"
          src={ isMeal ? data.strMealThumb : data.strDrinkThumb }
          alt={ isMeal ? 'foto da comida' : 'foto da bebida' }
        />

        <h2 data-testid="recipe-title">{isMeal ? data.strMeal : data.strDrink}</h2>

        <button
          type="button"
          id="share-btn"
          data-testid="share-btn"
          onClick={ () => copyToClipboard() }
        >
          <img
            src={ shareIcon }
            alt="compartilhar"
          />
        </button>
        { shareButton && <span>Link copiado!</span> }

        <button
          type="button"
          src={ verifyFavorite() ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar receita"
          data-testid="favorite-btn"
          onClick={ () => {
            setShowFavButton(!showFavButton);
            onFavoriteClick();
          } }
        >
          <img
            src={ verifyFavorite() ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite icon"
          />
        </button>

        <h2
          data-testid="recipe-category"
        >
          { isMeal ? data.strCategory : (`${data.strAlcoholic} - ${data.strCategory}`) }
        </h2>
        <ul>
          {arrayIngredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${ingredient} - ${arrayMeasures[index]}` }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{data.strInstructions}</p>

        {isMeal && (
          <div data-testid="video">
            <YouTube
              videoId={ youtubeLink(data.strYoutube, pathname) }
            />
          </div>)}

        <div className="scroll">
          <RecomendationCards
            itens={ recomendationData }
            pathname={ pathnameReverse }
            isMeal={ isMeal }
            cardsLimit={ 6 }
          />
        </div>

        <ButtonRecipe isMeal={ isMeal } id={ id } />
      </div>

    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default RecipeDetails;
