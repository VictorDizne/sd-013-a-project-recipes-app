import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipesList({ type }) {
  const lists = useSelector((state) => state.api.recipesList);
  const maxListLength = 12;

  if (!lists) {
    return null;
  }

  return (
    <div>
      {
        lists.slice(0, maxListLength).map((rec, index) => (
          <RecipeCard key={ index } type={ type } rec={ rec } idx={ index } />
        ))
      }
    </div>
  );
}

export default RecipesList;

RecipesList.propTypes = {
  type: PropTypes.string.isRequired,
};
