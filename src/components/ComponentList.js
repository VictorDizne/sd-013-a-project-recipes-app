import React, { useContext } from 'react';
import recipeContext from '../context';
import ComponentCard from './ComponentCard';
import './Styles/ListIngredients.css';

function ComponentList() {
  const currentContext = useContext(recipeContext).ContextCard;
  const { recipeList, loading } = currentContext;

  const quantity = 12;
  const twelveArray = recipeList.slice(0, quantity);

  return (
    <div className="list-container">
      { !loading && twelveArray.map((item, index) => (
        <ComponentCard
          key={ index }
          recipeIndex={ index }
          recipeItem={ item }
        />))}
    </div>
  );
}

export default ComponentList;
