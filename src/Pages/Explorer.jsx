import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from '../Components/Header';

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
