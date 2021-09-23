import React from 'react';
import PropTypes from 'prop-types';

const FilterResults = ({ fetchResult }) => {
  if (fetchResult) {
    if (fetchResult.drinks && fetchResult.drinks !== null) {
      const slicedResults = fetchResult.drinks.slice(0, Number('12'));
      console.log(slicedResults);
      return slicedResults.map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ drink.strDrink }>
          <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>
      ));
    }
    if (fetchResult.meals && fetchResult.meals !== null) {
      const slicedResults = fetchResult.meals.slice(0, Number('12'));
      console.log(slicedResults);
      return slicedResults.map((meal, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ meal.strMeal }>
          <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
        </div>
      ));
    }
    return null;
  }
  return null;
};

FilterResults.propTypes = {
  fetchResult: PropTypes.objectOf().isRequired,
};

export default FilterResults;
