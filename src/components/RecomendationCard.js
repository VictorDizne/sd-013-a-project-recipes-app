import React from 'react';
import PropTypes from 'prop-types';
import './css/RecomendationCard.css';

const RecomendationCard = ({ name, thumb, index }) => (
  <div className="recomendation-item">
    <h1 data-testid={ `${index}-recomendation-title` }>{ name }</h1>
    <img
      data-testid={ `${index}-recomendation-card` }
      src={ thumb }
      alt={ `${name} thumbnail` }
    />
  </div>
);

RecomendationCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
