import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';
import Filters from '../components/Filters';

const TelaComidas = () => {
  const { dataFood, categoryFood, categoryFilter } = useContext(MyContext);
  return (
    <>
      <Filters alimento={ categoryFood } />
      { categoryFilter === null ? createCard(dataFood, 'Meal')
        : createCard(categoryFilter, 'Meal') }
    </>
  );
};

export default TelaComidas;
