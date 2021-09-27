import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ index, recipe }) {
  const { strDrink, idDrink, strDrinkThumb } = recipe;

  return (
    <Link to={ `/bebidas/${idDrink}` }>
      <div
        className="contente"
      >
        <div data-testid={ `${index}-recipe-card` } className="content">
          <div className="content-individual">
            <img
              src={ strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt="Imagem da receita"
              width="50"
            />
            <p data-testid={ `${index}-card-name` }>
              { strDrink }
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default DrinkCard;
