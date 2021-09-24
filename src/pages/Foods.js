import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import '../styles/Food.css';

const Foods = () => {
  const { data, handleMealsApisOnLoad } = useContext(RecipesContext);
  const MAX_RECIPES = 12;

  useEffect(() => {
    handleMealsApisOnLoad();
  }, []);

  return (
    <div>
      <Header title="Comidas" hasSearchIcon page="foods" />
      <div className="Recipes-Container">
        { data && data.slice(0, MAX_RECIPES).map(((recipe, index) => (
          <RecipeCard key={ index } index={ index } recipe={ recipe } page="foods" />
        )))}
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
