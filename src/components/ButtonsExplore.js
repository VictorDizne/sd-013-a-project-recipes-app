import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonsExplore({ isMeal, recipeType, fetchRandom }) {
  return (
    <>

      <Link
        data-testid="explore-by-ingredient"
        to={ `/explorar/${recipeType}/ingredientes` }
      >
        Por Ingredientes
      </Link>

      {isMeal && (
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>)}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ fetchRandom }
      >
        Me Surpreenda!
      </button>

    </>
  );
}

ButtonsExplore.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  fetchRandom: PropTypes.func.isRequired,
};

export default ButtonsExplore;
