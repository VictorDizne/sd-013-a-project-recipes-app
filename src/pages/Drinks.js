import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';
import CategoriesDrink from '../components/CategoriesDrink';

import '../styles/Drinks.css';

function Drinks() {
  const { directRequestDrink,
    isDrinkOrMealLoading,
    selectedIngredient,
    displayByIngredients,
    setDisplayByingredients,
  } = useContext(RecipeContext);

  const MAX_NUMBER = 12;

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestDrink();
    return () => setDisplayByingredients(false); // equivale ao componentWillUnMount e muda o estado displayByIngredients para false
  }, []);

  const RecipesElement = !isDrinkOrMealLoading ? (
    <div>
      <RecipesList />
    </div>) : <p>Carregando</p>;

  const drinksByIngredient = (
    selectedIngredient.map((el, i) => {
      if (i < MAX_NUMBER) {
        return (
          <div
            data-testid={ `${i}-recipe-card` }
          >
            <span
              data-testid={ `${i}-card-name` }
            >
              {el.strDrink}
            </span>
            <img
              data-testid={ `${i}-card-img` }
              src={ el.strDrinkThumb }
              alt={ el.strDrinkThumb }
            />
          </div>
        );
      }
      return '';
    })
  );

  return (
    <div className="recipes-background-color">
      <Header title="Bebidas" />
      <CategoriesDrink />
      {displayByIngredients ? drinksByIngredient : RecipesElement}
      <Footer />
    </div>
  );
}

export default Drinks;
