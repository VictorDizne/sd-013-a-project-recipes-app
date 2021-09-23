import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';

const Provider = ({ children }) => {
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [categoryFood, setCategoryFood] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [btnState, setBtnState] = useState({});
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  console.log(btnState);
  /*  useEffect(() => {
    const filterFoodBtn = dataFood
      .filter((food) => food.strCategory === (btnState.category));
    setCategoryFilter(filterFoodBtn);
  }, [btnState]); */

  useEffect(() => {
    const foodRequest = async () => {
      const food = await foodAPIRequest();
      setDataFood(food);
    };
    foodRequest();
  }, []);

  useEffect(() => {
    const cocktailsRequest = async () => {
      const drink = await cocktailsAPIRequest();
      setDataDrink(drink);
    };
    cocktailsRequest();
  }, []);

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

  useEffect(() => {
    const { category } = btnState;
    const ApiCategoryFood = async () => {
      const fetchCategoryFood = await foodAPIRequest('filter', `c=${category}`);
      setCategoryFilter(fetchCategoryFood);
    };
    ApiCategoryFood();
  }, [btnState]);

  useEffect(() => {
    const { category } = btnState;
    const ApiCategoryDrink = async () => {
      const fetchCategoryDrink = await cocktailsAPIRequest('filter', `c=${category}`);
      setCategoryFilter(fetchCategoryDrink);
    };
    ApiCategoryDrink();
  }, [btnState]);

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
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
