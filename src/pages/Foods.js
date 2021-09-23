import React, { useContext } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const Foods = () => {
  const { data } = useContext(RecipesContext);
  const MAX_RECIPES = 12;
  return (
    <div>
      <Header title="Comidas" hasSearchIcon page="foods" />
      { data && data.slice(0, MAX_RECIPES).map(((recipe, index) => (
        <RecipeCard key={ index } index={ index } recipe={ recipe } page="foods" />
      )))}
      <Footer />
    </div>
  );
};

export default Foods;
