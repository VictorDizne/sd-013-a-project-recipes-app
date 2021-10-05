import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './index';
import * as comidasApi from '../services/comidasApi';
import * as bebidasApi from '../services/bebidasApi';

function Provider({ children }) {
  const [inputText, setInputText] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  const [mealData, setMealData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [foodCategories, setFoodCategories] = useState('');
  const [drinkCategories, setDrinkCategories] = useState('');
  const [ingredient, setIngredient] = useState('');
  const history = useHistory();

  const condicionalFoodLenght = (results) => {
    if (results && results.length === 1) {
      history.push(`/comidas/${results[0].idMeal}`);
    }
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
      setIngredient('');

      condicionalMessageError(results);
      condicionalFoodLenght(results);
    }

    if (inputRadio === 'name') {
      const results = await comidasApi.fetchFoodByName(inputText);
      setMealData(results);
      setIngredient('');

      condicionalMessageError(results);
      condicionalFoodLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length === 1) {
      const results = await comidasApi.fetchFoodByLetter(inputText);
      setMealData(results);
      setIngredient('');

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
      setIngredient('');
    };
    if (foodCategories) fetchFoodByCategoryAPI();
  }, [foodCategories]);

  useEffect(() => {
    const fetchFoodByIngredientsAPI = async () => {
      const results = await comidasApi.fetchFoodByIngredients(ingredient);
      setMealData(results);
    };
    if (ingredient) fetchFoodByIngredientsAPI();
  }, [ingredient]);

  const handleMealsApisOnLoad = async () => {
    const results = await comidasApi.fetchFoodOnLoad();
    setMealData(results);
    setIngredient('');
  };

  const handleDrinksApis = async () => {
    if (inputRadio === 'ingredient') {
      const results = await bebidasApi.fetchDrinkByIngredients(inputText);
      setDrinkData(results);
      setIngredient('');

      condicionalMessageError(results);
      condicionalDrinkLenght(results);
    }

    if (inputRadio === 'name') {
      const results = await bebidasApi.fetchDrinkByName(inputText);
      setDrinkData(results);
      setIngredient('');
      condicionalMessageError(results);
      condicionalDrinkLenght(results);
    }

    if (inputRadio === 'letter' && inputText.length === 1) {
      const results = await bebidasApi.fetchDrinkByLetter(inputText);
      setDrinkData(results);
      setIngredient('');
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
        setIngredient('');
      }
    };
    if (drinkCategories) fetchDrinkByCategoryAPI();
  }, [drinkCategories]);

  useEffect(() => {
    const fetchDrinkByIngredientsAPI = async () => {
      const results = await bebidasApi.fetchDrinkByIngredients(ingredient);
      setDrinkData(results);
    };
    if (ingredient) fetchDrinkByIngredientsAPI();
  }, [ingredient]);

  const handleDrinksApisOnload = async () => {
    const results = await bebidasApi.fetchDrinkOnLoad();
    setDrinkData(results);
    setIngredient('');
  };

  const contextValue = {
    inputText,
    setInputText,
    inputRadio,
    setInputRadio,
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
    ingredient,
    setIngredient,
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
