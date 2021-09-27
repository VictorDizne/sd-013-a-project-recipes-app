import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Share({ id, type }) {
  const [texto, setTexto] = useState(false);
  const shareItem = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setTexto(true);
    const TIMER = 500;
    setTimeout(() => {
      setTexto(false);
    }, TIMER);
  };
  return (
    <div>
      {texto && <h1>Link copiado!</h1>}
      <button type="button" onClick={ () => shareItem() }>
        <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
      </button>
    </div>
  );
}
Share.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default Share;
