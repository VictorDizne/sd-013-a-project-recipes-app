import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    foods: [],
    drinks: [],
    category: '',
    key: false,
    mealInProgress: {},
  });

  const [recipesInProgress, setRecipes] = useState([]);

  const getIngredients = (arrFood) => {
    const ingredients = [];
    const measures = [];
    const TWENTY_NUMBER = 20;
    for (let i = 1; i <= TWENTY_NUMBER; i += 1) {
      if (arrFood[`strIngredient${i}`]) {
        ingredients.push(arrFood[`strIngredient${i}`]);
        measures.push(arrFood[`strMeasure${i}`]);
      }
    }
    return { ingredients, measures };
  };

  const values = {
    state,
    setState,
    getIngredients,
    setRecipes,
    recipesInProgress,
  };

  return (
    <appContext.Provider value={ values }>
      {children}
    </appContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
