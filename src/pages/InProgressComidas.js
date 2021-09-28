import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

export default function InProgressComidas({ match: { params: { recipeId } } }) {
  const [meal, setMeal] = useState({});

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      // console.log(json.meals[0]);
      setMeal(json.meals[0]);
    };

    fetching();
  }, [recipeId]);

  return (
    <div>
      <RecipeInProgress recipe={ meal } isMeal />
    </div>
  );
}

InProgressComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
