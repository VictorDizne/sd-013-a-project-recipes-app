import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Popover, Typography } from '@material-ui/core';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import shareFill from '../images/shareFill.svg';

const ShareButton = ({ dataTestId, doneRecipe }) => {
  const { pathname } = useLocation();
  const [clipped, setClipped] = useState(false);

  const copy = () => {
    const SIX = 1000;
    if (pathname.includes('feitas')) {
      copytoclipboard(`http://localhost:3000/${doneRecipe.type}s/${doneRecipe.id}`);
      setClipped(true);
      return setTimeout(() => setClipped(false), SIX);
    }
    if (pathname.includes('progress')) {
      const arr = pathname.split('/');
      copytoclipboard(`http://localhost:3000/${arr[1]}/${arr[2]}`);
      setClipped(true);
      return setTimeout(() => setClipped(false), SIX);
    }

    copytoclipboard(`http://localhost:3000${pathname}`);
    setClipped(true);
    setTimeout(() => setClipped(false), SIX);
  };

  return (
    <div>
      <Button
        data-testid={ dataTestId }
        type="button"
        onClick={ copy }
        src={ shareIcon }
      >
        <img
          src={ clipped ? shareFill : shareIcon }
          alt="botão de copiar link da receita"
        />
      </Button>
      <Popover
        open={ clipped }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'left',
        } }
      >
        <Typography sx={ { p: 2 } }>Link copiado!</Typography>
      </Popover>
    </div>
  );
};

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  doneRecipe: PropTypes.shape(PropTypes.object).isRequired,
};

export default ShareButton;
