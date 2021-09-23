import React, { useContext } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const Drinks = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);
  const MAX_RECIPES = 12;
  return (
    <div>
      <Header title="Bebidas" hasSearchIcon page="drinks" />
      { data && data.slice(0, MAX_RECIPES).map(((recipe, index) => (
        <RecipeCard key={ index } index={ index } recipe={ recipe } page="drinks" />
      )))}
      <Footer />
    </div>
  );
};

export default Drinks;
