import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';

const Provider = ({ children }) => {
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);

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

  const contextValue = {
    dataFood,
    setDataFood,
    dataDrink,
    setDataDrink,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
