import PropTypes from 'prop-types';
import React from 'react';

function RecommendedCard({ testid }) {
  return (
    <div data-testid={ testid }>recommend</div>
  );
}

RecommendedCard.propTypes = {
  testid: PropTypes.string.isRequired,
};

export default RecommendedCard;
