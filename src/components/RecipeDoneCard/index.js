import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
// import './css/Card.css';

import style from './recipeDoneCard.module.scss';

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
    <div className={ style.card }>
      <input
        type="image"
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        onClick={ () => handleTitleImgClick(recipe) }
        className="recipe-image"
      />
      <div className={ style.title }>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { type === 'comida'
              ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot }
          </h5>
          <Link
            to={ `/${recipe.type === 'comida' ? 'comidas/' : 'bebidas/'}${recipe.id}` }
          >
            <h6 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h6>
          </Link>
          <h6 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h6>
        </div>
        <div>
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
      </div>

    </div>
  );
};

RecipeDoneCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeDoneCard;
