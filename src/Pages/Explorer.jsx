import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function Explorer() {
  const pageTitle = {
    pageName: 'Explorar',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar</h2>
      <MenuInferior />
    </div>
  );
}
