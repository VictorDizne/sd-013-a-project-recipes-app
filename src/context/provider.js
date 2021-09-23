import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '.';

function Provider({ children }) {
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [searchParameter, setSearchParameter] = useState();
  const [cardsToShow, setCardsToShow] = useState();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const baseResults = await response.json();
      setCardsToShow(baseResults);
      setLoading(false);
    }
    fetchData();
  }, []);

  const context = {
    meals,
    setMeals,
    drinks,
    details,
    setDetails,
    setDrinks,
    searchParameter,
    setSearchParameter,
    cardsToShow,
    setCardsToShow,
    loading,
    setLoading,
  };
  return (
    <recipesContext.Provider value={ context }>
      { children }
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
