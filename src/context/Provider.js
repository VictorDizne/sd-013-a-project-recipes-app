import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './index';
import * as comidasApi from '../services/comidasApi';
import * as bebidasApi from '../services/bebidasApi';

function Provider({ children }) {
  const [inputText, setInputText] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  // const [data, setData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [foodCategories, setFoodCategories] = useState('');
  const [drinkCategories, setDrinkCategories] = useState('');
  const history = useHistory();

  const condicionalFoodLenght = (results) => {
    if (results && results.length === 1) {
      history.push(`/comidas/${results[0].idMeal}`);
    }
    console.log(results, 'second');
  };

  const condicionalDrinkLenght = (results) => {
    if (results && results.length === 1) {
      history.push(`/bebidas/${results[0].idDrink}`);
    }
  };

  const condicionalMessageError = (results) => {
    if (!results) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const handleMealsApis = async () => {
    if (inputRadio === 'ingredient') {
      const results = await comidasApi.fetchFoodByIngredients(inputText);
      setMealData(results);

      condicionalMessageError(results);
      condicionalFoodLenght(results);
    }

    if (inputRadio === 'name') {
      const results = await comidasApi.fetchFoodByName(inputText);
      setMealData(results);

      condicionalMessageError(results);
      condicionalFoodLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length === 1) {
      const results = await comidasApi.fetchFoodByLetter(inputText);
      setMealData(results);

      condicionalMessageError(results);
      condicionalFoodLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  useEffect(() => {
    const fetchFoodByCategoryAPI = async () => {
      const results = await comidasApi.fetchFoodByCategories(foodCategories);
      setMealData(results);
    };
    if (foodCategories) fetchFoodByCategoryAPI();
  }, [foodCategories]);

  const handleMealsApisOnLoad = async () => {
    const results = await comidasApi.fetchFoodOnLoad();
    setMealData(results);
  };

  const handleDrinksApis = async () => {
    if (inputRadio === 'ingredient') {
      const results = await bebidasApi.fetchDrinkByIngredients(inputText);
      setDrinkData(results);

      condicionalMessageError(results);
      condicionalDrinkLenght(results);
    }

    if (inputRadio === 'name') {
      const results = await bebidasApi.fetchDrinkByName(inputText);
      setDrinkData(results);
      console.log(results);

      condicionalMessageError(results);
      condicionalDrinkLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length === 1) {
      const results = await bebidasApi.fetchDrinkByLetter(inputText);
      setDrinkData(results);

      condicionalMessageError(results);
      condicionalDrinkLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  useEffect(() => {
    const fetchDrinkByCategoryAPI = async () => {
      const results = await bebidasApi.fetchDrinkByCategories(drinkCategories);
      if (results) {
        setDrinkData(results);
      }
    };
    if (drinkCategories) fetchDrinkByCategoryAPI();
  }, [drinkCategories]);

  const handleDrinksApisOnload = async () => {
    const results = await bebidasApi.fetchDrinkOnLoad();
    setDrinkData(results);
  };

  const contextValue = {
    inputText,
    setInputText,
    inputRadio,
    setInputRadio,
    // data,
    // setData,
    mealData,
    setMealData,
    drinkData,
    setDrinkData,
    handleMealsApis,
    handleDrinksApis,
    handleMealsApisOnLoad,
    handleDrinksApisOnload,
    setFoodCategories,
    foodCategories,
    setDrinkCategories,
    drinkCategories,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
