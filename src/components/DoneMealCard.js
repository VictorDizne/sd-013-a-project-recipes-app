import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneMealCard({ recipe, index }) {
  const { area, category,
    name, image, doneDate, tags } = recipe;
  const MAX_TAGS = 2;
  const filteredTags = tags.slice(0, MAX_TAGS);
  console.log(filteredTags, 'filtered');
  // console.log(tags, 'tags');

  return (
    <div>
      <img
        src={ shareIcon }
        alt="Share Icon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
      <img
        src={ image }
        alt={ `foto de ${name}` }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
      <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em ${doneDate}`}</p>
      {/* {
        tags && tags.slice(0, MAX_TAGS)
          .map((tagName, tagIndex) => (
            <span key={ tagIndex } data-testid={ `${index}-${tagName}-horizontal-tag` }>
              {tagName}
            </span>))
      } */}
      {
        tags && filteredTags.map((tagName, tagIndex) => (
          <span key={ tagIndex } data-testid={ `${index}-${tagName}-horizontal-tag` }>
            {tagName}
          </span>))
      }
      {/* <p data-testid={ `${index}-${tags}-horizontal-tag` }>{tags}</p> */}
      {/* <p>{`Area: ${area}`}</p> */}
    </div>
  );
}

DoneMealCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
  area: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.array,
}.isRequired;

export default DoneMealCard;
