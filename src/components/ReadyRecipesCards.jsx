import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
/* import shareIcon from '../images/shareIcon.svg';
import appContext from '../contexts/appContext'; */
import ShareButton from './shareButton';

function ReadyRecipesCards({ doneRecipes }) {
  if (doneRecipes === null) {
    // console.log(doneRecipes[0].tags);
    return (
      <div>
        Você não tem receitas finalizas
      </div>
    );
  }
  return (
    <div>
      {
        doneRecipes.map((doneRecipe, index) => (
          <div key={ index }>
            <Link
              to={ (doneRecipe.type === 'comida')
                ? `/comidas/${doneRecipe.id}`
                : `/bebidas/${doneRecipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ doneRecipe.image }
                alt={ doneRecipe.name }
                style={ { width: '200px', height: '200px' } }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {doneRecipe.type === 'comida'
                ? `${doneRecipe.area} - ${doneRecipe.category}`
                : doneRecipe.alcoholicOrNot}
            </p>
            <Link
              to={ (doneRecipe.type === 'comida')
                ? `/comidas/${doneRecipe.id}`
                : `/bebidas/${doneRecipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                { doneRecipe.name }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { doneRecipe.doneDate }
            </p>
            <ShareButton dataTestId={ `${index}-horizontal-share-btn` } />
            { doneRecipe.tags.map((tag) => (
              <span
                key={ `${index} - span` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))
      }
    </div>
  );
}

ReadyRecipesCards.propTypes = {
  doneRecipes: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default ReadyRecipesCards;
