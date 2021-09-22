import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ alimento, tipo }) => {
  const image = alimento[`str${tipo}Thumb`];

  return <img alt="name" src={ image } className="imageFood" />;
};

Card.propTypes = {
  alimento: PropTypes.shape({}),
  tipo: PropTypes.string,
}.isRequired;

export default Card;
