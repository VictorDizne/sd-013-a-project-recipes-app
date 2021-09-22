import React from 'react';
import PropTypes from 'prop-types';

function BebidasDetalhes({ match }) {
  const { recipeId } = match.params;
  return (
    <div>
      <h1>
        BebidasDetalhes
        {recipeId}
      </h1>
    </div>
  );
}

BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BebidasDetalhes;
