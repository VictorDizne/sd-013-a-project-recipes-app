import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ id, type }) {
  const [stateShare, setStateShare] = useState(true);

  function handleClick() {
    copy(`http://localhost:3000/${type}/${id}`);
    setStateShare(false);
  }
  return (
    stateShare
      ? (
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="Share"
          onClick={ handleClick }
        />
      )
      : <p>Link copiado!</p>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default ShareButton;
