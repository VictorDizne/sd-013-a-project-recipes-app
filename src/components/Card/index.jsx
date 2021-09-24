import PropTypes from 'prop-types';
import React from 'react';
import style from './Card.module.css';

const Card = ({ index, img, name }) => (
  <article className={ style.article } data-testid={ `${index}-recipe-card` }>
    <img
      className={ style.recipePhoto }
      data-testid={ `${index}-card-img` }
      src={ img }
      alt={ `Foto referente a receita de ${name}` }
    />
    <p data-testid={ `${index}-card-name` }>
      {name}
    </p>
  </article>
);

const { number, string } = PropTypes;

Card.propTypes = {
  img: string.isRequired,
  index: number.isRequired,
  name: string.isRequired,
};

export default Card;
