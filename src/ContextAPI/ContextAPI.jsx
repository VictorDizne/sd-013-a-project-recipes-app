import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextAPIProvider({ children }) {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const errorMessage = (
    'Sinto muito, não encontramos nenhuma receita para esses filtros.'
  );

  // Lógica para gerar mensagem de erro inspirada em código de colegas disponível no link a seguir:
  // https://github.com/tryber/sd-013-a-project-recipes-app/pull/57;

  const fetchIngredient = async (type, ingredient) => {
    try {
      setLoading(true);
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setSearchData(json.meals);
        setLoading(false);
      } else {
        setSearchData(json.drinks);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchName = async (type, name) => {
    try {
      setLoading(true);
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${name}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setSearchData(json.meals);
        setLoading(false);
      } else {
        setSearchData(json.drinks);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFirstLetter = async (type, firstLetter) => {
    try {
      setLoading(true);
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const json = await result.json();

      if (json.meals === null || json.drinks === null) {
        global.alert(errorMessage);
        return [];
      }

      if (type === 'themealdb') {
        setSearchData(json.meals);
        setLoading(false);
      } else {
        setSearchData(json.drinks);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = async (type, category) => {
    setLoading(false);
    const result = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await result.json();
    if (type === 'themealdb') {
      setSearchData(json.meals);
      setLoading(false);
    } else {
      setSearchData(json.drinks);
      setLoading(false);
    }
  };

  const fetchAPI = async (type) => {
    const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
    const json = await result.json();
    if (type === 'themealdb') {
      setSearchData(json.meals);
    } else {
      setSearchData(json.drinks);
    }
  };

  // const { pathname } = useLocation();
  // verificar
  const pathnameCheck = (pathname) => {
    switch (pathname) {
    case '/comidas/':
      return 'themealdb';
    case '/bebidas/':
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  // const pathnameReverse = () => {
  //   switch (pathname) {
  //   case '/comidas':
  //     return 'thecocktaildb';
  //   case '/bebidas':
  //     return 'themealdb';
  //   default:
  //     return null;
  //   }
  // };

  const value = {
    fetchIngredient,
    fetchName,
    fetchFirstLetter,
    fetchCategories,
    fetchAPI,
    pathnameCheck,
    // pathnameReverse,
    searchData,
    setSearchData,
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
