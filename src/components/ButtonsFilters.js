import React, { useEffect, useContext, useState } from 'react';
import * as myFunc from '../services/api';
import MyContext from '../context/Context';

function ButtonsFilters({ page }) {
  const { myPage, setRecipes } = useContext(MyContext);
  const [filters, setFilters] = useState([]);
  const [controlFilter, setControlFilter] = useState('');

  const requestCategory = async () => {
    const newFilter = ['All'];
    const LIMITER_CATEGORY = 5;
    const results = await myFunc.fetchCategory(myPage);
    results[page].forEach(
      (item, index) => index < LIMITER_CATEGORY && newFilter.push(item.strCategory),
    );
    setFilters(newFilter);
  };

  const requestCategorySelect = async (item) => {
    const LIMITER_MEALS = 12;
    if (controlFilter === item || item === 'All') {
      const result = await myFunc.fetchRandonRecipes(myPage);
      const filterCategory = result[page].filter((item, index) => index < LIMITER_MEALS );
      setRecipes(filterCategory);
      setControlFilter('');
    } else {
      const result = await myFunc.fetchCategoryApi(myPage, item);
      const filterCategory = result[page].filter((item, index) => index < LIMITER_MEALS );
      setRecipes(filterCategory);
      setControlFilter(item);
    }
  }

  useEffect(() => {
    requestCategory();
  }, [myPage]);

  return (
    <div>

      {filters.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item}-category-filter` }
          onClick={() => requestCategorySelect(item) }
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default ButtonsFilters;
