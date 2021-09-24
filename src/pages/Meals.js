import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MainContext } from '../context/Provider';
import ReciperCard from '../components/RecipeCard';

function Meals() {
  const { recipesMeals } = useContext(MainContext);
  const maxList = 12;
  let recipesList = recipesMeals;

  if (recipesMeals.length > maxList) {
    recipesList = recipesMeals.slice(1, maxList + 1);
  }

  return (
    <>
      <Header />
      {recipesList.map((recipe, index) => (
        <ReciperCard
          key={ recipe.idMeal }
          index={ index }
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
        />))}
      <Footer />
    </>
  );
}

export default Meals;
