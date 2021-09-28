import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

const NUM_MEALS = 12;

function MealsList() {
  const { filteredMeals } = useContext(Context);

  return (
    filteredMeals
      .filter((_meal, idx) => idx < NUM_MEALS)
      .map((meal, idx) => (
        <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
          <section key={ meal.strMeal } data-testid={ `${idx}-recipe-card` }>
            <h2 data-testid={ `${idx}-card-name` }>{meal.strMeal}</h2>
            <img
              src={ meal.strMealThumb }
              data-testid={ `${idx}-card-img` }
              className="img-fluid"
              alt={ meal.strMeal }
            />
          </section>
        </Link>
      ))
  );
}

export default MealsList;
