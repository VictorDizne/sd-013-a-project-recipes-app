import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import {
  queryDefaultMeals,
  queryIngredient,
  queryName,
  queryFirstLetter,
  queryDefaultDrinks,
  queryFirstLetterDrink,
  queryIngredientDrink,
  queryNameDrink,
  categoriesMeals,
  categoriesDrinks,
  fetchCategoryMeal,
  fetchCategoryDrink,
  queryRecipeByID,
  queryDrinkByID,
  getDrinkSurprise,
  getMealSurprise,
} from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [mealsDataById, setMealsDataById] = useState([]);
  const [drinksById, setDrinksById] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startButton, setStartButton] = useState(true);
  const [startedRecipes, setStartRecipe] = useState([]);

  const maxNumberIt = 12;

  const arrayFiltered = (arr) => {
    if (arr && arr.length > maxNumberIt) {
      return arr.filter((_, index) => (
        index < maxNumberIt
      ));
    }
    return arr;
  };

  // ========================================================================================================
  // Função para juntar os Ingredientes com as Medidas - referencia grupo 24;

  // const listIngredients = (DataDetails, ingredients) => {
  //   const number = 20;
  //   if (DataDetails && DataDetails.length !== 0) {
  //     for (let i = 1; i <= number; i += 1) {
  //       if (DataDetails[0][`strIngredient${i}`]) {
  //         const ing = `${DataDetails[0][`strIngredient${i}`]}`;
  //         const mes = `${DataDetails[0][`strMeasure${i}`]}`;
  //         ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
  //       } else break;
  //     }
  //   }
  // };

  const listIngredients = (DataDetails, ingredients) => {
    const number = 20;
    if (DataDetails && DataDetails.length !== 0) {
      for (let i = 1; i <= number; i += 1) {
        if (DataDetails[0][`strIngredient${i}`]) {
          const ing = `${DataDetails[0][`strIngredient${i}`]}`;
          const mes = `${DataDetails[0][`strMeasure${i}`]}`;
          ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
        }
      }
    }
  };

  // ========================================================================================================
  // Fetch para atuar na montagem das paginas "Food" e "Drinks"

  const fetchDataMeals = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultMeals());
    setData(dataToOpen);
  };

  const fetchDataDrinks = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultDrinks());
    setDataDrinks(dataToOpen);
  };

  // ========================================================================================================
  // Fetch para atuar nos toggles buttons disponíveis no Header através do Componente "Categories"

  const fetchDataMealsByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryMeal(strCategory));
    setData(dataToOpen);
  };

  const fetchDataDrinksByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryDrink(strCategory));
    setDataDrinks(dataToOpen);
  };
  // ========================================================================================================
  // Fetch realizado pelo ID

  const fetchDataByIdMeal = async (mealID) => {
    const dados = await queryRecipeByID(mealID);
    setMealsDataById(dados);
  };

  const fetchDataByIdDrink = async (drinkId) => {
    const dados = await queryDrinkByID(drinkId);
    setDrinksById(dados);
  };

  // ========================================================================================================

  const contextValue = {
    ...data,
    dataDrinks,
    setData,
    setDataDrinks,
    mealsDataById,
    drinksById,
    loading,
    setLoading,
    startButton,
    setStartButton,
    startedRecipes,
    setStartRecipe,
    fetchDataMeals,
    fetchDataDrinks,
    getDrinkSurprise,
    getMealSurprise,
    recipesApi: {
      queryDefaultMeals,
      queryFirstLetter,
      queryIngredient,
      queryName,
      categoriesMeals,
      fetchDataMealsByCategory,
      fetchDataByIdMeal,
    },
    drinksApi: {
      queryDefaultDrinks,
      queryFirstLetterDrink,
      queryIngredientDrink,
      queryNameDrink,
      categoriesDrinks,
      fetchDataDrinksByCategory,
      fetchDataByIdDrink,
    },
    arrayFiltered,
    listIngredients,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
