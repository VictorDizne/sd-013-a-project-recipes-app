import React from 'react';
import Header from '../Components/Header';

export default function FavouriteReciples() {
  const pageTitle = {
    pageName: 'Receitas Favoritas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      FOODS
    </div>
  );
}
