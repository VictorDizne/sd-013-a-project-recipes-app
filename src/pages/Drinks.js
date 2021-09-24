import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MainContext } from '../context/Provider';
import ReciperCard from '../components/RecipeCard';

function Drinks() {
  const { recipesDrinks } = useContext(MainContext);
  const maxList = 12;
  let recipesList = recipesDrinks;

  if (recipesDrinks.length > maxList) {
    recipesList = recipesDrinks.slice(1, maxList + 1);
  }

  return (
    <>
      <Header />
      {recipesList.map((recipe, index) => (
        <ReciperCard
          key={ recipe.idDrink }
          index={ index }
          name={ recipe.strDrink }
          img={ recipe.strDrinkThumb }
        />))}
      <Footer />
    </>
  );
}

export default Drinks;
