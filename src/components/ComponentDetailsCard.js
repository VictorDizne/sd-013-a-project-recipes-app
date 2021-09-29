import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import recipeContext from '../context';

const copy = require('clipboard-copy');

function ComponentDetailsCard({ detailItem, renderIngredients }) {
  const history = useHistory();
  const handlePage = history.location.pathname.includes('/comidas');
  const [message, setMessage] = useDebugState('message', false);
  const [favoriteIcon, setFavoriteIcon] = useDebugState('favorite', false);

  const { details } = useContext(recipeContext).ContextDetails;
  const { idMeal, strCategory, strMeal, strMealThumb, strArea } = details[0];
  console.log(idMeal, strCategory, strMeal, strMealThumb, strArea);

  const handleClick = () => {
    console.log('click');
    setMessage(!message);
    copy(window.location.href);
  };

  const handleFavorite = () => {
    setFavoriteIcon(!favoriteIcon);
    const favoriteObject = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObject));
  };

  const renderMeal = () => {
    const video = detailItem.strYoutube.replace('watch?v=', 'embed/');
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ detailItem.strMealThumb }
          alt={ detailItem.strMeal }
        />
        <button type="button" data-testid="share-btn" onClick={ handleClick }>
          <img src={ shareIcon } alt="" />
        </button>
        {message && <p>Link copiado!</p>}
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
            alt=""
          />
        </button>
        <h1 data-testid="recipe-title">{detailItem.strMeal}</h1>
        <h4 data-testid="recipe-category">{detailItem.strCategory}</h4>
        {renderIngredients()}
        <p data-testid="instructions">{detailItem.strInstructions}</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ video }
          title={ detailItem.strMeal }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderDrink = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ detailItem.strDrinkThumb }
        alt={ detailItem.strDrink }
      />
      <button type="button" data-testid="share-btn" onClick={ handleClick }>
        <img src={ shareIcon } alt="" />
      </button>
      {message && <p>Link copiado!</p>}
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
      <h1 data-testid="recipe-title">{detailItem.strDrink}</h1>
      <h4 data-testid="recipe-category">
        {detailItem.strCategory}
        ,
        {' '}
        {detailItem.strAlcoholic}
      </h4>
      {renderIngredients()}
      <p data-testid="instructions">{detailItem.strInstructions}</p>
    </div>
  );

  return (
    <div>
      {handlePage ? renderMeal() : renderDrink()}
    </div>
  );
}

ComponentDetailsCard.propTypes = {
  detailItem: PropTypes.objectOf(Object).isRequired,
  renderIngredients: PropTypes.func.isRequired,
};

export default ComponentDetailsCard;
