import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ id, type, testid }) {
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
          data-testid={ testid || 'share-btn' }
          src={ shareIcon }
          alt="Share"
          onClick={ handleClick }
        />
      )
      : <p>Link copiado!</p>
  );
}
ShareButton.defaultProps = {
  testid: undefined,
};
ShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testid: PropTypes.string,
};
export default ShareButton;
