import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ alimento, tipo, chave }) => {
  const image = alimento[`str${tipo}Thumb`];
  const name = alimento[`str${tipo}`];
  return (
    <div data-testid={ `${chave}-recipe-card` }>
      <img
        alt={ name }
        src={ image }
        className="imageFood"
        data-testid={ `${chave}-card-img` }
      />
      <p data-testid={ `${chave}-card-name` }>{name}</p>
    </div>
  );
};

Card.propTypes = {
  alimento: PropTypes.shape({}),
  tipo: PropTypes.string,
}.isRequired;

export default Card;
