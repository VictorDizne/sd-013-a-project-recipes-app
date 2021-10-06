import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import { saveLocalStorage, handleFavoriteIcon, handleShare } from '../functions';
import recipeContext from '../context';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import IngredientProgress from './ingredients/IngredientProgress';
import IngredientDetails from './ingredients/IngredientDetails';
import './Styles/RecipeInProgress.css';

const copy = require('clipboard-copy');

function ComponentDetailsContent({ keys }) {
  const { details, recipeProgress } = useContext(recipeContext).ContextDetails;
  const history = useHistory();
  const currentPage = useHistory().location.pathname.includes('/in-progress');

  const favoritedRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
    .some((recipe) => recipe.id === details[keys.id]);

  const [favoriteIcon, setFavoriteIcon] = useDebugState('FavoriteIcon', favoritedRecipe);
  const [share, setShareIcon] = useDebugState('Share', false);
  const [button, setButton] = useDebugState('button', true);

  useEffect(() => {
    setFavoriteIcon(favoritedRecipe);
  }, [favoritedRecipe, setFavoriteIcon]);

  useEffect(() => {
    if (recipeProgress !== '') {
      setButton(Object.values(recipeProgress).every((item) => item === true));
    }
  }, [recipeProgress]);

  if (details[keys.title] === undefined) return <h1>Loading</h1>;

  let youtube;

  if (keys.iframe) youtube = details[keys.video].replace('watch?v=', 'embed/');

  const handleClick = () => {
    // CRIA O OBJETO E SETA NO LOCALSTORAGE
    const newArray = {
      id: details[keys.id],
      type: keys.typeK,
      area: details[keys.area],
      category: details[keys.category],
      alcoholicOrNot: details[keys.alcoholicOrNot],
      name: details[keys.title],
      image: details[keys.thumb],
      doneDate: new Date(Date.now()).toLocaleString().split(' ')[0],
      tags: [details.strTags],
    };
    saveLocalStorage('doneRecipes', newArray, details[keys.id]);
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ details[keys.thumb] } alt="recipe" />
      <button type="button" onClick={ () => handleShare(setShareIcon, share, copy) }>
        <img data-testid="share-btn" src={ ShareIcon } alt="" width="30px" />
      </button>
      {
        share && <p>Link copiado!</p>
      }
      <button
        type="button"
        onClick={ () => handleFavoriteIcon(setFavoriteIcon, favoriteIcon, details, keys) }
      >
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

      {
        keys.click
          ? <IngredientProgress idK={ details[keys.id] } />
          : <IngredientDetails />
      }

      <h5 data-testid="instructions">{details[keys.instructions]}</h5>

      {
        keys.iframe && <iframe
          data-testid="video"
          width="300"
          height="200"
          src={ youtube }
          title={ details[keys.title] }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      }
      {currentPage
      && (
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ handleClick }
          disabled={ !button }
        >
          FINALIZAR
        </button>)}
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
