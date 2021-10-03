import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import { saveLocalStorage } from '../functions';
// import usePersistedState from '../utils/usePersistedState';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import './Styles/RecipeInProgress.css';

const copy = require('clipboard-copy');

function ComponentDetailsContent({ keys, func }) {
  const { details } = useContext(recipeContext).ContextDetails;

  const favoritedRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
    .some((recipe) => recipe.id === details[keys.id]);

  //  const progressActual = {};

  const [favoriteIcon, setFavoriteIcon] = useDebugState('FavoriteIcon', favoritedRecipe);
  const [share, setShareIcon] = useDebugState('Share', false);
  //  const [progress, setProgress] = useDebugState('Progress ingredients', progressActual);

  useEffect(() => {
    setFavoriteIcon(favoritedRecipe);
  }, [favoritedRecipe, setFavoriteIcon]);

  if (details[keys.title] === undefined) return <h1>Loading</h1>;

  const alcoholic = details[keys.alcoholicOrNot] || '';
  const areaK = details[keys.area] || '';
  let youtube;

  if (keys.iframe) youtube = details[keys.video].replace('watch?v=', 'embed/');

  const handleFavoriteIcon = () => {
    setFavoriteIcon(!favoriteIcon);
    const newArray = {
      id: details[keys.id],
      type: keys.typeK,
      area: areaK,
      category: details[keys.category],
      alcoholicOrNot: alcoholic,
      name: details[keys.title],
      image: details[keys.thumb],
    };

    saveLocalStorage(newArray, details[keys.id]);
  };

  const handleShare = () => {
    setShareIcon(!share);
    if (!share) {
      const url = window.location.href.split('/in-progress');
      const splitedURL = url[0];
      copy(splitedURL);
    } else {
      copy('');
    }
  };

  const handleClick = ({ target }) => {
    target.parentNode.classList.toggle('risk');
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ details[keys.thumb] } alt="recipe" />
      <button type="button" onClick={ handleShare }>
        <img data-testid="share-btn" src={ ShareIcon } alt="" width="30px" />
      </button>
      {share && <p>Link copiado!</p>}
      <button type="button" onClick={ handleFavoriteIcon }>
        <img
          data-testid="favorite-btn"
          src={ favoriteIcon ? BlackHeartIcon : WhiteHeartIcon }
          alt=""
          width="30px"
        />
      </button>
      <h1 data-testid="recipe-title">{details[keys.title]}</h1>
      <h4 data-testid="recipe-category">
        {details[keys.category]}
        {' '}
        {details[keys.alcoholicOrNot]}
      </h4>
      {keys.click ? func(details, handleClick) : func(details)}
      <h5 data-testid="instructions">{details[keys.instructions]}</h5>
      {keys.iframe && <iframe
        data-testid="video"
        width="300"
        height="200"
        src={ youtube }
        title={ details[keys.title] }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
    </div>
  );
}

ComponentDetailsContent.propTypes = {
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

export default ComponentDetailsContent;
