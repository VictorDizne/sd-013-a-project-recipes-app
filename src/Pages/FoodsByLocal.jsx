import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from '../Components/Header';

export default function FoodsByLocal() {
  const pageTitle = {
    pageName: 'Explorar Origem',
    setIcon: true,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>FOODS LOCAL</h2>
      <MenuInferior />
    </div>
  );
}
