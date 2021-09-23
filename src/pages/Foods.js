import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
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
      <Header title="Comidas" hasSearchIcon page="foods" />
      {
        newData.map(((recipe, index) => (
          <RecipeCard key={ index } index={ index } recipe={ recipe } page="foods" />
        )))
      }
    </div>
  );
};

export default Foods;
