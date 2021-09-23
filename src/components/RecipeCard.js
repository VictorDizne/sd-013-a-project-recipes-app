import PropTypes from 'prop-types';
import React from 'react';

export default function ReciperCard({ name, index, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
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
