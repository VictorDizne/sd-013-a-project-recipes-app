import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetail({ match: { params: { id } } }) {
  return (
    <p>
      ID aqui:
      { id }
    </p>
  );
}

RecipeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetail;
