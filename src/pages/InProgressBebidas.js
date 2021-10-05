import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function InProgressBebidas({ match: { params: { recipeId } } }) {
  const [drink, setDrink] = useState({});

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      // console.log(json.drinks[0]);
      setDrink(json.drinks[0]);
    };

    fetching();
  }, [recipeId]);

  return (
    <div>
      <RecipeInProgress recipe={ drink } isMeal={ false } />
    </div>
  );
}

InProgressBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default InProgressBebidas;
