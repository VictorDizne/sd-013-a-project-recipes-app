import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function Recipes() {
  const pageTitle = {
    pageName: 'Receitas Favoritas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>FOODS</h2>
      <MenuInferior />
    </div>
  );
}
