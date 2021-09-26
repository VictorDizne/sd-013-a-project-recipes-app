import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextAPIProvider({ children }) {
  const [data, setData] = useState([]);

  const errorMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const fetchIngredient = async (type, ingredient) => {
    try {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const json = await result.json();

      if (type === 'themealdb') {
        setData(json.meals);
      } else {
        setData(json.drinks);
      }
    } catch (e) {
      global.alert(errorMessage);
    }
  };

  const fetchName = async (type, name) => {
    try {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
      const json = await result.json();

      if (type === 'themealdb') {
        setData(json.meals);
      }
      setData(json.drinks);
    } catch (e) {
      global.alert(errorMessage);
    }
  };

  const fetchFirstLetter = async (type, firstLetter) => {
    try {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const json = await result.json();

      if (type === 'themealdb') {
        setData(json.meals);
      }
      setData(json.drinks);
    } catch (e) {
      global.alert(errorMessage);
    }
  };

  const value = {
    fetchIngredient,
    fetchName,
    fetchFirstLetter,
    data,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

ContextAPIProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default ContextAPIProvider;
