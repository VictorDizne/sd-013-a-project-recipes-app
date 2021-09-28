import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function FilteredCards({ recipes, favoriteOrDone = 'done' }) {
  return (
    <div>
      {
        recipes
          .map(({
            image, area, category, name, tags, doneDate, type, alcoholicOrNot, id,
          }, index) => (
            <div key={ index }>
              <Link to={ `./${type}s/${id}` }>
                <input
                  width="300px"
                  src={ image }
                  type="image"
                  alt="Imagem Horizontal"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}`}
              </p>
              <Link to={ `./${type}s/${id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              </Link>
              { favoriteOrDone === 'done'
              && (
                <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              )}
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                alt="Ícone de compartilhar"
                src={ shareIcon }
              />
              { favoriteOrDone === 'favorite'
              && (
                <input
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="image"
                  alt="Ícone de compartilhar"
                  src={ favoriteIcon }
                />
              )}
              { favoriteOrDone === 'done'
              && (
                <div>
                  {
                    tags.map((tag, i) => (
                      <p
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ i }
                      >
                        {tag}
                      </p>
                    ))
                  }
                </div>
              )}
            </div>
          ))
      }
    </div>
  );
}

FilteredCards.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoriteOrDone: PropTypes.string.isRequired,
};

export default FilteredCards;
