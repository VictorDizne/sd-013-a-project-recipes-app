import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Drinks = () => {
  const { data } = useContext(RecipesContext);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const newArray = [];
    const MAX_RECIPES = 11;
    for (let i = 0; i <= MAX_RECIPES; i += 1) {
      if (data[i]) {
        newArray.push(data[i]);
      }
    }
    setNewData(newArray);
  }, [data]);

  return (
    <div>
      <Header title="Bebidas" hasSearchIcon page="drinks" />
      {
        newData.map(((recipe, index) => (
          <RecipeCard key={ index } index={ index } recipe={ recipe } />
        )))
      }
    </div>
  );
};

export default Drinks;
