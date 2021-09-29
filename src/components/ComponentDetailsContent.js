import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import { ingredientAndMeasureArray, saveLocalStorage } from '../functions';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ComponentDetailsContent({ keys }) {
  const { details } = useContext(recipeContext).ContextDetails;

  const { title, category, typeK, id, alcoholicOrNot, thumb, area, instructions, video,
    iframe } = keys;

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  const value = favoriteRecipes.some((recipe) => recipe.id === details[id]);

  const [favoriteIcon, setFavoriteIcon] = useDebugState('FavoriteIcon', value);
  const [share, setShareIcon] = useDebugState('Share', false);

  useEffect(() => {
    setFavoriteIcon(value);
  }, [value]);

  if (details[title] === undefined) return <h1>Loading</h1>;

  let alcoholic;
  let areaK;
  let youtube;

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

  if (iframe) youtube = details[video].replace('watch?v=', 'embed/');

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

  return (
    <div>
      <img data-testid="recipe-photo" src={ details[thumb] } alt={ details[title] } />
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
      <h1 data-testid="recipe-title">{details[title]}</h1>
      <h4 data-testid="recipe-category">
        {details[category]}
        {' '}
        {details[alcoholicOrNot]}
      </h4>
      {ingredientAndMeasureArray(details)}
      <h5 data-testid="instructions">{details[instructions]}</h5>
      {iframe && <iframe
        data-testid="video"
        width="300"
        height="200"
        src={ youtube }
        title={ details[title] }
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
