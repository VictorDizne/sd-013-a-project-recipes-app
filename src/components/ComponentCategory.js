import React, { useContext } from 'react';
import recipeContext from '../context';

function ComponentCategory() {
  const currentContext = useContext(recipeContext).ContextCard;
  const { categoryList, loading, fetchFoodsOfCategory,
    dataForFetch: { currentPage } } = currentContext;

  const quantity = 5;
  const controledList = categoryList.slice(0, quantity);
  return (
    // PROBLEMA DE SINCRONIA NA VERIFICAÇÃO QUE HABILITA O MAP
    <div>
      {!loading && controledList.map((item, index) => (
        <button
          onClick={ () => fetchFoodsOfCategory(currentPage, item.strCategory) }
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
