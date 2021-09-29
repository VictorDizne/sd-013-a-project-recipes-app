import React, { useState, useEffect } from 'react';
import RecomendationCard from './RecomendationCard';

const RecipeRecomendations = ({ isMeal }) => {
  const [recomendation, setRecomendation] = useState([]);
  const MAX_RECIPES = 6;
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(isMeal
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=');

      const json = await res.json();

      if (isMeal) {
        setRecomendation(json.drinks.slice(0, MAX_RECIPES));
      } else {
        setRecomendation(json.meals.slice(0, MAX_RECIPES));
      }
    };

    fetching();
  }, [isMeal]);

  return recomendation.length > 0 && recomendation.map((recipe, i) => {
    if (isMeal) {
      return (
        <RecomendationCard
          key={ `${recipe} ${i}` }
          name={ recipe.strDrink }
          thumb={ recipe.strDrinkThumb }
          index={ i }
        />
      );
    }
    return (
      <RecomendationCard
        key={ `${recipe} ${i}` }
        name={ recipe.strMeal }
        thumb={ recipe.strMealThumb }
        index={ i }
      />);
  });
};

export default RecipeRecomendations;
