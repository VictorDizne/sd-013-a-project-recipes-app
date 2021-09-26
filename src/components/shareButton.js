import React, { useState } from 'react';
import { useLocation } from 'react-router';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const ShareButton = () => {
  const { pathname } = useLocation();
  const [clipped, setClipped] = useState(false);

  const copy = () => {
    const SIX = 6000;
    copytoclipboard(`http://localhost:3000${pathname}`);
    console.log(pathname);
    setClipped(true);
    setTimeout(() => setClipped(false), SIX);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copy }
      >
        <img src={ shareIcon } alt="botão de copiar link da receita" />
      </button>
      { clipped && <p>Link copiado!</p>}
    </div>
  );
};

export default ShareButton;
