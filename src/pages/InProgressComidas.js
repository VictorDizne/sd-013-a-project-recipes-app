import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';
import Loading from '../components/Loading';
import RecipesContext from '../context/RecipesContext';

export default function InProgressComidas({ match: { params: { recipeId } } }) {
  const [meal, setMeal] = useState({});
  const { isLoading, setIsLoading } = useContext(RecipesContext);
  const isTrue = true;

  useEffect(() => {
    const fetching = async () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((response) => response.json())
        .then((json) => {
          setMeal(json.meals[0]);
          setIsLoading(false);
        });
    };

    fetching();
  }, [recipeId, setIsLoading]);

  return (
    isLoading
      ? <Loading />
      : <RecipeInProgress recipe={ meal } isMeal={ isTrue } />
  );
}

InProgressComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
