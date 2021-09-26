import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function Drinks() {
  const pageTitle = {
    pageName: 'Bebidas',
    setIcon: true,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h1>Drinks</h1>
      <MenuInferior />
    </div>
  );
}
