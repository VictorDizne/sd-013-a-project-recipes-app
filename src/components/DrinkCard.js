import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DrinkCard({ index, recipe }) {
  const history = useHistory();
  const { strDrink, idDrink, strDrinkThumb } = recipe;

  const hadleChange = () => {
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <button type="button" onClick={ hadleChange }>
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
    </button>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default DrinkCard;
