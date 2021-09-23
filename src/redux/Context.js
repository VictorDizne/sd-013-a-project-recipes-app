import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appcontext';

export default function Provider({ children }) {
  const [userEmail, changeUserEmail] = useState('');
  const [userPassword, changeUserPassword] = useState('');
  const [drinkApi, setDrinks] = useState([]);
  const [filterDrinkApi, saveFilteredItens] = useState([]);
  const [mealsApi, setMeals] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      const endpointMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpointMeals).then((res) => res.json());
      const filterMeals = meals.slice(Number('0'), Number('12'));
      setMeals(filterMeals);
    }
    async function fetchDrinks() {
      const endpointDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpointDrink).then((res) => res.json());
      const filterDrinks = drinks.slice(Number('0'), Number('12'));
      setDrinks(filterDrinks);
    }
    fetchDrinks();
    fetchMeals();
  }, []);

  const contextValue = {
    userEmail,
    changeUserEmail,
    userPassword,
    changeUserPassword,
    drinkApi,
    mealsApi,
    filterDrinkApi,
    saveFilteredItens,
  };

  return (
    <appContext.Provider value={ contextValue }>
      {children}
    </appContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
