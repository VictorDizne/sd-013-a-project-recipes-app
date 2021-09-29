import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appcontext';

export default function Provider({ children }) {
  const [userEmail, changeUserEmail] = useState('');
  const [userPassword, changeUserPassword] = useState('');
  const [drinkApi, setDrinks] = useState([]);
  const [filterDrinkApi, saveFilteredItens] = useState([]);
  const [mealsApi, setMeals] = useState([]);
  const [drinkApiRecomendationCard, setDrinkApiRecomendationCard] = useState([]);
  const [mealsApiRecomendationCard, setMealsApiRecomendationCard] = useState([]);
  const [activeSearchbarFilter, toggleSearchbarFilter] = useState(false);
  const [pageIngredients, setPageIngredients] = useState(false);
  const [fetchIngredients, setFetchIngredients] = useState([]);
  const [pageAreas, setPageAreas] = useState(false);
  const [area, setArea] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const endpointMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpointMeals).then((res) => res.json());
      const filterMeals = meals.slice(Number('0'), Number('12'));
      const filterMealsRecomendationCard = meals.slice(Number('0'), Number('6'));
      setMeals(filterMeals);
      setMealsApiRecomendationCard(filterMealsRecomendationCard);
    }
    async function fetchDrinks() {
      const endpointDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpointDrink).then((res) => res.json());
      const filterDrinks = drinks.slice(Number('0'), Number('12'));
      const filterDrinksRecomendationCard = drinks.slice(Number('0'), Number('6'));
      setDrinks(filterDrinks);
      setDrinkApiRecomendationCard(filterDrinksRecomendationCard);
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
    mealsApiRecomendationCard,
    drinkApiRecomendationCard,
    activeSearchbarFilter,
    toggleSearchbarFilter,
    pageIngredients,
    setPageIngredients,
    fetchIngredients,
    setFetchIngredients,
    area,
    setArea,
    pageAreas,
    setPageAreas,
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
