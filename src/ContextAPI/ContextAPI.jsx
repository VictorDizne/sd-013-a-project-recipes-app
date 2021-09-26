import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextAPIProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');

  const errorMessage = (
    'Sinto muito, não encontramos nenhuma receita para esses filtros.'
  );
  // Lógica para gerar mensagem de erro inspirada em código de colegas disponível no link a seguir:
  // https://github.com/tryber/sd-013-a-project-recipes-app/pull/57;

  const fetchIngredient = async (type, ingredient) => {
    try {
      setLoading({ loading: true });
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setData(json.meals);
        setLoading({ loading: false });
      } else {
        setData(json.drinks);
        setLoading({ loading: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchName = async (type, name) => {
    try {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setData(json.meals);
        setLoading({ loading: false });
      } else {
        setData(json.drinks);
        setLoading({ loading: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFirstLetter = async (type, firstLetter) => {
    try {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setData(json.meals);
        setLoading({ loading: false });
      } else {
        setData(json.drinks);
        setLoading({ loading: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    fetchIngredient,
    fetchName,
    fetchFirstLetter,
    data,
    loading,
    setLoading,
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
