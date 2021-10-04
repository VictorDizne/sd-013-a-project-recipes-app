import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function MadeCard({ recipe, index }) {
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ `${recipe.image}/preview` }
        alt={ recipe.name }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'bebida' ? recipe.alcoholicOrNot : `${recipe.area} - ${recipe.category}` }
      </h4>
      <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
      <h5
        data-testid={ `${index}-horizontal-done-date` }
      >
        {`Feito em: ${recipe.doneDate}`}
      </h5>
      <div>
        {
          recipe.tags.map((tag, i) => (
            <p
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>))
        }
      </div>
      <input
        type="image"
        src={ shareIcon }
        alt="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

export default MadeCard;
