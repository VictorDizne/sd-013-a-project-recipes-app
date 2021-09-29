import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import { ingredientsInProgressArray, saveLocalStorage } from '../functions';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import SerachIcon from '../images/shareIcon.svg';
import './Styles/RecipeInProgress.css';

const copy = require('clipboard-copy');

function ComponentRecipeInProgress({ keys }) {
  const { fetchDetails, details } = useContext(recipeContext).ContextDetails;
  const currentPage = useHistory().location.pathname.includes('/comidas');
  const { id } = useParams();

  const { title, category, typeK, idK, alcoholicOrNot, thumb, area, instructions } = keys;
  console.log(typeK, idK, area);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  const value = favoriteRecipes.some((recipe) => recipe.id === details[id]);

  const [favoriteIcon, setFavoriteIcon] = useDebugState('FavoriteIcon', value);
  const [share, setShareIcon] = useDebugState('Share', false);

  useEffect(() => {
    setFavoriteIcon(value);
  }, [value]);

  useEffect(() => {
    if (currentPage) {
      fetchDetails('themealdb', 'lookup', 'i', id);
    } else {
      fetchDetails('thecocktaildb', 'lookup', 'i', id);
    }
  }, [currentPage, id]);

  if (details[title] === undefined) return <h1>Loading</h1>;

  let alcoholic;
  let areaK;

  if (details[alcoholicOrNot] === undefined) {
    alcoholic = '';
  } else {
    alcoholic = details[alcoholicOrNot];
  }

  if (details[area] === undefined) {
    areaK = '';
  } else {
    areaK = details[area];
  }

  const handleFavoriteIcon = () => {
    setFavoriteIcon(!favoriteIcon);
    const newArray = {
      id: details[id],
      type: typeK,
      area: areaK,
      category: details[category],
      alcoholicOrNot: alcoholic,
      name: details[title],
      image: details[thumb],
    };

    saveLocalStorage(newArray, details[id]);
  };

  const handleShare = () => {
    setShareIcon(!share);
    if (!share) {
      copy(window.location.href);
    } else {
      copy('');
    }
  };

  const handleClick = ({ target }) => {
    target.parentNode.classList.toggle('risk');
  };

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <img data-testid="recipe-photo" src={ details[thumb] } alt={ details[title] } />
      <h1 data-testid="recipe-title">{details[title]}</h1>
      <button type="button" onClick={ handleShare }>
        <img
          data-testid="share-btn"
          src={ SerachIcon }
          alt={ details[title] }
          width="30px"
        />
      </button>
      {share && <p>Link copiado!</p>}
      <button type="button" onClick={ handleFavoriteIcon }>
        <img
          data-testid="favorite-btn"
          src={ favoriteIcon ? BlackHeartIcon : WhiteHeartIcon }
          alt={ details[title] }
          width="30px"
        />
      </button>
      <h4 data-testid="recipe-category">
        {details[category]}
        {' '}
        {details[alcoholicOrNot]}
      </h4>
      <ul>
        {ingredientsInProgressArray(details, handleClick)}
      </ul>
      <p data-testid="instructions">{details[instructions]}</p>
      <button data-testid="finish-recipe-btn" type="button">FINALIZAR</button>
    </div>
  );
}

ComponentRecipeInProgress.propTypes = {
  keys: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default ComponentRecipeInProgress;
