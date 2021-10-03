import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const ShareButton = ({ dataTestId }) => {
  const { pathname } = useLocation();
  const [clipped, setClipped] = useState(false);

  const copy = () => {
    const SIX = 6000;
    copytoclipboard(`http://localhost:3000${pathname}`);
    setClipped(true);
    setTimeout(() => setClipped(false), SIX);
  };

  return (
    <div>
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ copy }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="botão de copiar link da receita" />
      </button>
      { clipped && <p>Link copiado!</p>}
    </div>
  );
};

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
};

export default ShareButton;
