import React from 'react';
import FavoriteCard from '../components/favoriteCard';
import Header from '../components/header';

function FavoriteRecipes() {
  return (
    <div>
      <Header name="Receitas Favoritas" search={ false } />
      <FavoriteCard />
    </div>
  );
}

export default FavoriteRecipes;
