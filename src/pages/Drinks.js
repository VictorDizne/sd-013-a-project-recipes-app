import React, { useContext } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Drinks = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);
  const MAX_RECIPES = 12;
  return (
    <div>
      <Header title="Bebidas" hasSearchIcon page="drinks" />
      { data.slice(0, MAX_RECIPES).map(((recipe, index) => (
        <RecipeCard key={ index } index={ index } recipe={ recipe } page="drinks" />
      )))}
    </div>
  );
};

export default Drinks;
