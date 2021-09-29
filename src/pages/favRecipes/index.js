import React from 'react';
import FilterFavRecipes from '../../components/filterFavRecipes';
import CardMealRecipes from '../../components/favRecipes';

function FavRecipes() {
  return (
    <div>
      <FilterFavRecipes />
      <CardMealRecipes />
    </div>
  );
}

export default FavRecipes;
