import React from 'react';
import { Header } from '../../components';
import RecipesList from '../../components/RecipesList';

function Foods() {
  return (
    <div>
      <Header title="Comidas" search />
      <RecipesList type="Meal" />
    </div>
  );
}

export default Foods;
