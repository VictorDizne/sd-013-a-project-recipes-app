import React, { useContext } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
  const { data } = useContext(RecipesContext);
  const MAX_RECIPES = 12;
  return (
    <div>
      <Header title="Comidas" hasSearchIcon page="foods" />
      { data !== null && data.slice(0, MAX_RECIPES).map(((recipe, index) => (
        <RecipeCard key={ index } index={ index } recipe={ recipe } page="foods" />
      )))}
    </div>
  );
};

export default Foods;
