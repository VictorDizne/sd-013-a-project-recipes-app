import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as myFuncHelper from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';

function RecipesMadeCard({ data, index }) {
  const { tags, name, image, doneDate, category, alcoholicOrNot, type, id, area } = data;
  const [copySuccess, setCopySuccess] = useState('');

  const returnTag = (tag) => (
    <span data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
  );

  return (
    <div
      style={ {
        display: 'flex',
        border: '1px solid black',
        width: '48%',
        margin: '1%' } }
    >
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { height: '50px', width: '50px' } }
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{`feita em: ${doneDate}`}</p>
        </div>
        <div>
          { tags !== null && [...tags].map((item) => returnTag(item)) }
        </div>
      </Link>
      <button
        style={ { position: 'relative', top: 0, right: 0, zIndex: 2 } }
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => myFuncHelper
          .copyToClipBoard(`http://localhost:3000/${type}s/${id}`, setCopySuccess) }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share-icon" />
        {copySuccess}
      </button>
    </div>
  );
}

RecipesMadeCard.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesMadeCard;
