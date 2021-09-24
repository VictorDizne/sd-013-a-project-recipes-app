import PropTypes from 'prop-types';
import React from 'react';

export default function ReciperCard({ name, index, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card">
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
        className="imgThumb"
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

ReciperCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;
