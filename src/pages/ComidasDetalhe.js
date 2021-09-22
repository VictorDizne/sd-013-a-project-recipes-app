import React from 'react';
import PropTypes from 'prop-types';

function ComidasDetalhes({ match }) {
  const { recipeId } = match.params;
  return (
    <div>
      <h1>
        ComidasDetalhes
        {recipeId}
      </h1>
    </div>
  );
}

ComidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ComidasDetalhes;
