import React from 'react';
import PropTypes from 'prop-types';
import './carousel.css';

const Carousel = ({ recomendations, keys }) => (
  <div className="overflow-x">
    {recomendations.map((ele, i) => (
      <div data-testid={ `${i}-recomendation-card` } className="item" key={ i }>
        <img src={ ele[`str${keys}Thumb`] } alt="" />
        <p data-testid={ `${i}-recomendation-title` }>{ele[`str${keys}`]}</p>
      </div>
    ))}
  </div>
);

Carousel.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.string.isRequired,
};

export default Carousel;
