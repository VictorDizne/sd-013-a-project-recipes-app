import React, { useContext } from 'react';
import Filters from '../components/Filters';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';

const TelaBebidas = () => {
  const { dataDrink, categoryDrink, categoryFilter } = useContext(MyContext);
  return (
    <>
      <Filters alimento={ categoryDrink } />
      { categoryFilter === null ? createCard(dataDrink, 'Drink')
        : createCard(categoryFilter, 'Drink') }
    </>
  );
};

export default TelaBebidas;
