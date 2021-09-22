import React, { useContext } from 'react';
import Filters from '../components/Filters';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';

const TelaBebidas = () => {
  const { dataDrink, categoryDrink } = useContext(MyContext);
  return (
    <>
      <Filters alimento={ categoryDrink } />
      { createCard(dataDrink, 'Drink') }
    </>
  );
};

export default TelaBebidas;
