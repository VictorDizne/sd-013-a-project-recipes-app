import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';
import Filters from '../components/Filters';

const TelaComidas = () => {
  const { dataFood, categoryFood } = useContext(MyContext);
  return (
    <>
      <Filters alimento={ categoryFood } />
      { createCard(dataFood, 'Meal') }
    </>
  );
};

export default TelaComidas;
