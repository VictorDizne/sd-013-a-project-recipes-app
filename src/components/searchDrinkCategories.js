import React, { useState, useEffect, useContext } from 'react';
import appContext from '../contexts/appContext';
import { fetchByCategoryDrink, fetchByName } from '../services/fetchs';

const SearchDrinkCategories = () => {
  const { state, setState } = useContext(appContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => setDrinkCategories(await fetchByCategoryDrink());
    fetchData();
  }, []);

  const MAX_NUMBER = 5;

  const toggleFilter = async ({ target: { value } }) => {
    if (state.category !== value) {
      return setState({
        ...state,
        drinks: await fetchByCategoryDrink(value, 'filter'),
        category: value });
    }
    setState({ ...state, drinks: await fetchByName('thecocktaildb', '') });
  };

  return (
    <div>
      {drinkCategories
        .filter((category, index) => index < MAX_NUMBER)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            value={ category.strCategory }
            onClick={ (e) => toggleFilter(e) }
          >
            {category.strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ async () => setState({
          ...state, drinks: await fetchByName('thecocktaildb', ''),
        }) }
      >
        All
      </button>
    </div>
  );
};

export default SearchDrinkCategories;
