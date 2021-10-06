import PropTypes from 'prop-types';
import React from 'react';
import { useDebugState } from 'use-named-state';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import { handleShareDone } from '../functions';

const copy = require('clipboard-copy');

function ComponentDoneCard({ currentData, dataIndex }) {
  const [share, setShareIcon] = useDebugState('Share', false);
  const history = useHistory();

  const params = {
    id: currentData.id,
    type: currentData.type,
  };

  const handleClick = () => {
    const URL = `${currentData.type}s/${currentData.id}`;
    history.push(URL);
  };

  return (
    <div>
      <hr />
      <button type="button" onClick={ handleClick }>
        <img
          src={ currentData.image }
          alt=""
          data-testid={ `${dataIndex}-horizontal-image` }
          width="100px"
        />
        <p data-testid={ `${dataIndex}-horizontal-top-text` }>
          {currentData.area}
          {currentData.alcoholicOrNot}
          {' - '}
          {currentData.category}
        </p>
        <p data-testid={ `${dataIndex}-horizontal-name` }>{currentData.name}</p>
        <p data-testid={ `${dataIndex}-horizontal-done-date` }>{currentData.doneDate}</p>
        {currentData.tags.map((tag) => (
          <p
            data-testid={ `${dataIndex}-${tag}-horizontal-tag` }
            key={ tag }
          >
            {tag}
          </p>
        ))}
      </button>
      <button
        type="button"
        onClick={ () => handleShareDone(setShareIcon, share, copy, params) }
      >
        <img
          data-testid={ `${dataIndex}-horizontal-share-btn` }
          src={ ShareIcon }
          alt=""
          width="30px"
        />
      </button>
      {
        share && <p>Link copiado!</p>
      }
    </div>
  );
}

ComponentDoneCard.propTypes = {
  currentData: PropTypes.objectOf(Object).isRequired,
  dataIndex: PropTypes.number.isRequired,
};

export default ComponentDoneCard;
