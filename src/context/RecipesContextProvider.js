import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

const RecipesContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const handleBtnClick = ({ input, isMeal, radio }) => {
    const radioIdsObj = {
      Ingrediente: isMeal ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
      Nome: isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
      'Primeira Letra': isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
    };

    if (radio === 'Primeira Letra' && input.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    if (isMeal) {
      // console.log('tamo aqui hein');
      fetch(radioIdsObj[radio])
        .then((res) => res.json())
        .then((json) => {
          const endIndex = 12;
          const twelveFirstMeals = json.meals.splice(0, endIndex);
          setMeals(twelveFirstMeals);
          return json.meals;
        })
        .catch((err) => console.log(err.message));
    } else {
      // console.log('tamo aqui nao');
      fetch(radioIdsObj[radio])
        .then((res) => res.json())
        .then((json) => {
          const endIndex = 12;
          const twelveFirstDrinks = json.drinks.splice(0, endIndex);
          setDrinks(twelveFirstDrinks);
          return json.drinks;
        })
        .catch((err) => console.log(err.message));
    }
  };

  const getMealsCategories = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setMealsCategories(json.categories))
      .catch((err) => console.log(err.message));
  };

  const getDrinksCategories = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDrinksCategories(json.drinks))
      .catch((err) => console.log(err.message));
  };

  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    handleBtnClick,
    mealsCategories,
    drinksCategories,
    getMealsCategories,
    getDrinksCategories,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
