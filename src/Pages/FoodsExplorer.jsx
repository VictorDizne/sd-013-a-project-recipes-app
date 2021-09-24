import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function FoodsExplorer() {
  const pageTitle = {
    pageName: 'Explorar Comidas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar Comidas</h2>
      <MenuInferior />
    </div>
  );
}
