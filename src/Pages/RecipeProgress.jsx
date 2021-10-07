import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../Images/whiteHeartIcon.svg';
import blackHeartIcon from '../Images/blackHeartIcon.svg';
import shareIcon from '../Images/shareIcon.svg';
import useApiId from '../Hooks/useApiId';
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

function checkFavorite(isMeal, data, setFavButton) {
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
}

const RecipeProgress = (props) => {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const pathnameCheck = (pathnameParam) => {
    switch (pathnameParam) {
    case `/comidas/${id}/in-progress`:
      return 'themealdb';
    case `/bebidas/${id}/in-progress`:
      return 'thecocktaildb';
    default:
      return null;
    }
  };
  console.log(pathname);

  const [data, isMeal] = useApiId(pathnameCheck(pathname), id);
  const [favButton, setFavButton] = useState(false);
  const [showFavButton, setShowFavButton] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const arrayMeasures = [];
  const arrayIngredients = [];
  const VINTE = 20;
  console.log(favButton);

  verifyFunction(VINTE, data, arrayIngredients, arrayMeasures);

  const copyToClipboard = () => {
    if (isMeal) {
      setShareButton(true);
      return navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    }
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
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

  const onFavoriteClick = () => (verifyFavorite()
    ? unCheckFavorite()
    : checkFavorite(isMeal, data, setFavButton));

  return (
    <div>
      <h1>RecipeInProgress</h1>

      <div>
        <img
          data-testid="recipe-photo"
          src={ isMeal ? data.strMealThumb : data.strDrinkThumb }
          alt={ isMeal ? 'foto da comida' : 'foto da bebida' }
          style={ { height: '20vh' } }
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
        {arrayIngredients.map((ingredient, index) => (
          <ul key={ index }>
            <li id={ index } data-testid={ `${index}-ingredient-step` }>
              <input type="checkbox" id={ index } />
              { ` ${ingredient} - ${arrayMeasures[index]}` }
            </li>
          </ul>
        ))}
        <p data-testid="instructions">{data.strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </div>

    </div>
  );
};

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeProgress;
