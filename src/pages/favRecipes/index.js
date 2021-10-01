import React from 'react';
import CardMealRecipes from '../../components/favRecipes';
import Header from '../../components/header';

function FavRecipes() {
  if (!localStorage.favoriteRecipes) {
    console.log('?');
    return (
      <>
        <Header title="Receitas Favoritas" />
        <p>Não há receitas favoritas</p>
      </>
    );
  }
  return (
    <div>
      <CardMealRecipes />
    </div>
  );
}

export default FavRecipes;
