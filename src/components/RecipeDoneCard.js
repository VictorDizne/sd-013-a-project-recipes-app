import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './css/Card.css';

const copy = require('clipboard-copy');

const RecipeDoneCard = ({ recipe, index, history }) => {
  const { type } = recipe;

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
};

export default RecipeDoneCard;
