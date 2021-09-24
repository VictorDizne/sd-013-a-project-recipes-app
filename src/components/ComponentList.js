import React, { useRef, useEffect, useContext } from 'react';
import recipeContext from '../context';
import ComponentCard from './ComponentCard';

function ComponentList() {
  const mapRecipeList = useRef(false);
  const currentContext = useContext(recipeContext).ContextCard;
  const { recipeList } = currentContext;

  useEffect(() => {
    if (recipeList.length > 1) mapRecipeList.current = true;
  }, [recipeList]);

  const quantity = 12;
  const twelveArray = recipeList.slice(0, quantity);

  return (
    <div>
      { mapRecipeList.current && twelveArray.map((item, index) => (
        <ComponentCard
          key={ index }
          recipeIndex={ index }
          recipeItem={ item }
        />))}
    </div>
  );
}

export default ComponentList;
