import React from 'react';
import Header from './Header';

export default function Recipes() {
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
