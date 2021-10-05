import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './buttonsExplore.module.scss';

function ButtonsExplore({ isMeal, recipeType, fetchRandom }) {
  return (
    <div className={ style.buttonsExplore }>

      <Link
        data-testid="explore-by-ingredient"
        to={ `/explorar/${recipeType}/ingredientes` }
      >
        <span role="img" aria-label="ingrediente">🧅</span>
        {' '}
        Por Ingredientes
      </Link>

      {isMeal && (
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          <span role="img" aria-label="origem">🌎</span>
          {' '}
          Por Local de Origem
        </Link>)}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ fetchRandom }
      >
        <span role="img" aria-label="aleatório">❔</span>
        {' '}
        Me Surpreenda!
      </button>

    </div>
  );
}

ButtonsExplore.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  fetchRandom: PropTypes.func.isRequired,
};

export default ButtonsExplore;
