import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from '../Components/Header';

export default function ExploreByIngredients() {
  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>FOODS OR DRINKS</h2>
      <MenuInferior />
    </div>
  );
}
