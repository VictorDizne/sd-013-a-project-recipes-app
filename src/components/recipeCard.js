import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, title, index }) {
  let mealOrDrink;
  if (title === 'Comidas' || title === 'Explorar Origem') {
    mealOrDrink = 'Meal';
  } else {
    mealOrDrink = 'Drink';
  }
  const nameKey = `str${mealOrDrink}`;
  const thumbKey = `str${mealOrDrink}Thumb`;

  function details(id) {
    const toDetails = {
      pathname: `/comidas/${id}`,
      id,
    };
    return toDetails;
  }
  return (
    <Link to={ () => details(recipe.idMeal) }>
      <button type="button">
        <img
          src={ recipe[thumbKey] }
          alt="Recipe thumbnail"
          width="150"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          { recipe[nameKey] }
        </p>
      </button>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
