import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function DrinksExplorer() {
  const pageTitle = {
    pageName: 'Explorar Bebidas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar Bebidas</h2>
      <MenuInferior />
    </div>
  );
}
