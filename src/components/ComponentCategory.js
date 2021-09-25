import React, { useContext, useRef, useEffect } from 'react';
import recipeContext from '../context';

function ComponentCategory() {
  const currentContext = useContext(recipeContext).ContextCard;
  const { categoryList, loading, fetchFoodsOfCategory,
    dataForFetch: { currentPage } } = currentContext;

  const quantity = 5;
  const controledList = categoryList.slice(0, quantity);

  const activeFilter = useRef(false);

  useEffect(() => {
    console.log('componentDidMount');
  }, []);

  const handleClick = (item) => {
    if (activeFilter.current === false) {
      activeFilter.current = true;
    } else {
      activeFilter.current = false;
    }
    fetchFoodsOfCategory(currentPage, item.strCategory, activeFilter.current);
  };

  return (
    <div>
      {!loading && controledList.map((item, index) => (
        <button
          onClick={ () => handleClick(item) }
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
          type="button"
        >
          { item.strCategory }
        </button>))}
    </div>
  );
}

export default ComponentCategory;
