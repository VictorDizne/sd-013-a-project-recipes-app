import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function MealCard({ index, recipe }) {
  const history = useHistory();
  const { strMeal, strMealThumb, idMeal } = recipe;
  const hadleChange = () => {
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <button type="button" onClick={ hadleChange }>
      <div
        className="contente"
      >
        <div data-testid={ `${index}-recipe-card` } className="content">
          <div className="content-individual">
            <img
              src={ strMealThumb }
              data-testid={ `${index}-card-img` }
              alt="Imagem da receita"
              width="50"
            />
            <p data-testid={ `${index}-card-name` }>
              { strMeal}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
MealCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default MealCard;
