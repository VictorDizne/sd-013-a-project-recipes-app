import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';

const Provider = ({ children }) => {
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [categoryFood, setCategoryFood] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [btnState, setBtnState] = useState({ category: '' });
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchBarFilters, setSearchBarFilters] = useState([]);
  const [searchBarFilters2, setSearchBarFilters2] = useState([]);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  // const [idUnico, setIdUnico] = useState(0)
  console.log(searchBarFilters);
  /* const [stateButton, setStateButton] = useState([]); */

  useEffect(() => {
    const categoryFoodRequest = async () => {
      const category = await foodAPIRequest('list', 'c=list');
      setCategoryFood(category);
    };
    categoryFoodRequest();
  }, []);

  useEffect(() => {
    const categoryDrinkRequest = async () => {
      const drink = await cocktailsAPIRequest('list', 'c=list');
      setCategoryDrink(drink);
    };
    categoryDrinkRequest();
  }, []);

  // useEffect(() => {
  //   if (searchBarFilters.length === 1) {
  //     setShouldRedirect(true);
  //     setIdUnico(searchBarFilters[0].idMeal);
  //   }
  // }, [searchBarFilters]);

  const contextValue = {
    dataFood,
    setDataFood,
    dataDrink,
    setDataDrink,
    categoryFood,
    setCategoryFood,
    categoryDrink,
    setCategoryDrink,
    btnState,
    setBtnState,
    categoryFilter,
    isFiltered,
    setIsFiltered,
    setCategoryFilter,
    searchBarFilters,
    setSearchBarFilters,
    searchBarFilters2,
    setSearchBarFilters2,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
