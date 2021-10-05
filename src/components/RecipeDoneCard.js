import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import favoritedIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './css/Card.css';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

const RecipeDoneCard = ({ recipe, index, history, shouldHaveFavorite,
  removeFavorite }) => {
  const { removeFavoriteBtn } = useContext(RecipesContext);
  const { type } = recipe;

  const handleFavoriteBtn = () => {
    removeFavoriteBtn(recipe);
    removeFavorite();
  };

  const handleShareBtn = (recipeId, recipeType, recipeIndex) => {
    const isMeal = recipeType === 'comida';
    copy(`http://localhost:3000/${isMeal ? 'comidas/' : 'bebidas/'}${recipeId}`);

    const h4 = document.createElement('h4');
    h4.textContent = 'Link copiado!';
    const father = document
      .querySelector(`[data-testid="${recipeIndex}-horizontal-share-btn"]`);
    father.insertAdjacentElement('afterend', h4);
  };

  const handleTitleImgClick = (rec) => {
    const isMeal = rec.type === 'comida';
    history.push(`/${isMeal ? 'comidas/' : 'bebidas/'}${rec.id}`);
  };

  return (
    <div>
      <input
        type="image"
        alt="alguma coisa"
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        onClick={ () => handleTitleImgClick(recipe) }
        className="recipe-image"
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'comida'
          ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot }
      </p>
      <Link to={ `/${recipe.type === 'comida' ? 'comidas/' : 'bebidas/'}${recipe.id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      <input
        type="image"
        src={ shareIcon }
        alt="compartilhar receita"
        onClick={ () => handleShareBtn(recipe.id, recipe.type, index) }
        data-testid={ `${index}-horizontal-share-btn` }
      />
      {shouldHaveFavorite && <input
        type="image"
        src={ favoritedIcon }
        alt="desfavoritar receita"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ handleFavoriteBtn }
      /> }
      {recipe.tags && recipe.tags.map((tag) => (
        <span
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      ))}

    </div>
  );
};

RecipeDoneCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldHaveFavorite: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default RecipeDoneCard;
