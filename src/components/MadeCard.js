import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function MadeCard({ recipe, index }) {
  const history = useHistory();

  return (
    <div>
      <input
        type="image"
        data-testid={ `${index}-horizontal-image` }
        src={ `${recipe.image}/preview` }
        alt={ recipe.name }
        onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        {
          recipe.type === 'bebida' ? recipe.alcoholicOrNot
            : `${recipe.area} - ${recipe.category}`
        }
      </h4>
      <Link
        data-testid={ `${index}-horizontal-name` }
        to={ `${recipe.type}s/${recipe.id}` }
      >
        {recipe.name}
      </Link>
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
      <ShareButton
        testid={ `${index}-horizontal-share-btn` }
        type={ `${recipe.type}s` }
        id={ recipe.id }
      />
    </div>
  );
}

MadeCard.propTypes = {
  index: PropTypes.string,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string,
  }),
}.isRequired;

export default MadeCard;
