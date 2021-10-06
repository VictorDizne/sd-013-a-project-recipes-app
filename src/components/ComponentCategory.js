import React, { useContext, useRef, useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import './Styles/Category.css';

function ComponentCategory() {
  const currentContext = useContext(recipeContext).ContextCard;
  const { categoryList, loading, fetchFoodsOfCategory,
    dataForFetch: { currentPage } } = currentContext;

  const quantity = 5;
  const controledList = categoryList.slice(0, quantity);

  const currentButtonFilter = useRef('');
  const [buttonFilter, setButtonFilter] = useDebugState('buttonFilter', '');

  const setFilter = ({ target: { id } }) => {
    setButtonFilter({ [id]: !buttonFilter[id] });
    currentButtonFilter.current = id;
  };

  const dynamicFetch = () => {
    if (buttonFilter[currentButtonFilter.current] === true) {
      fetchFoodsOfCategory(currentPage, 'filter', 'c', currentButtonFilter.current);
    }
    if (buttonFilter[currentButtonFilter.current] === false) {
      fetchFoodsOfCategory(currentPage, 'search', 's', '');
    }
  };

  useEffect(dynamicFetch, [buttonFilter]);

  return (
    <div className="category-container">
      {!loading && controledList.map((item, index) => (
        <button
          key={ index }
          id={ item.strCategory }
          onClick={ setFilter }
          data-testid={ `${item.strCategory}-category-filter` }
          type="button"
          className="category-buttons"
        >
          { item.strCategory }
        </button>))}
      <button
        onClick={ () => fetchFoodsOfCategory(currentPage, 'search', 's', '') }
        data-testid="All-category-filter"
        type="button"
        className="category-buttons"
      >
        All
      </button>
    </div>
  );
}

export default ComponentCategory;
