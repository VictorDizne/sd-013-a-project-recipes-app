import React, { useState, useEffect, useContext } from 'react';
import appContext from '../contexts/appContext';
import { fetchByCategoryFood, fetchByName } from '../services/fetchs';

const SearchFoodCategories = () => {
  const { state, setState } = useContext(appContext);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => setFoodCategories(await fetchByCategoryFood());
    fetchData();
  }, []);

  const MAX_NUMBER = 5;

  const toggleFilter = async ({ target: { value } }) => {
    if (state.category !== value) {
      return setState({
        ...state,
        foods: await fetchByCategoryFood(value, 'filter'),
        category: value });
    }
    setState({ ...state, foods: await fetchByName('themealdb', '') });
  };

  return (
    <div>
      {foodCategories
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
          ...state, foods: await fetchByName('themealdb', ''),
        }) }
      >
        All
      </button>
    </div>
  );
};

export default SearchFoodCategories;
