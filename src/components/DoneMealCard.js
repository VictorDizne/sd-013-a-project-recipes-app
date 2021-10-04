import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { shareMealHelper } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';

function DoneMealCard({ recipe, index }) {
  const { id, area, category,
    name, image, doneDate, tags } = recipe;
  const MAX_TAGS = 2;
  const filteredTags = tags.slice(0, MAX_TAGS);
  const [messageAlert, setMessageAlert] = useState('');
  const history = useHistory();

  const shareRecipe = () => {
    shareMealHelper(id, setMessageAlert);
  };

  const sendToDetailsPage = () => {
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <p>{messageAlert}</p>
      {/* <img
        src={ shareIcon }
        alt="Share Icon"
         }
      /> */}
      <button
        type="button"
        onClick={ shareRecipe }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button
        type="button"
        onClick={ sendToDetailsPage }
      >
        <img
          src={ image }
          alt={ `foto de ${name}` }
          data-testid={ `${index}-horizontal-image` }
          width="80px"
        />
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
      <button
        type="button"
        onClick={ sendToDetailsPage }
      >
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </button>
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
