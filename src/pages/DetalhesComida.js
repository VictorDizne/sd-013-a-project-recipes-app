import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

export default function DetalhesComida({ match: { params: { recipeId } } }) {
  const [meal, setMeal] = useState({});

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      console.log(json.meals[0]);
      setMeal(json.meals[0]);
    };

    fetching();
  }, [recipeId]);

  return (
    <div>
      <RecipeDetails recipe={ meal } isMeal />
    </div>
  );
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
