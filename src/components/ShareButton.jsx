import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { shareIcon } from '../images';

const copy = require('clipboard-copy');

function ShareButton({ id, type }) {
  const [visibility, setVIsibility] = useState(false);

  const hostName = window.location.origin;

  const timeOut = 2000;

  const handleShareLink = () => {
    // pode ser usando o href ou location.pathname
    copy(`${hostName}${type}/${id}`);
    setVIsibility(true);
    setTimeout(() => {
      setVIsibility(false);
    }, timeOut);
  };

  return (
    <>
      <button
        className="share-btn"
        type="button"
        data-testid="share-btn"
        onClick={ handleShareLink }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { visibility && <div className="alert">Link copiado!</div> }
    </>
  );
}

const { string } = PropTypes;

ShareButton.propTypes = {
  id: string,
  type: string,
}.isRequired;

export default ShareButton;
