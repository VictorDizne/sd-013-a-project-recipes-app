import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

function MealCard({ index, recipe }) {
  const { strMeal, strMealThumb, idMeal } = recipe;

  return (
    <Link to={ `/comidas/${idMeal}` } className="link">
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
    </Link>
  );
}
MealCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default MealCard;
