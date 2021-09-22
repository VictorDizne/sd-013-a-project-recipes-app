import React from 'react';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarBebidasIngredientes() {
  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        hideSearch
        hideProfile={ false }
      />
      <ComponentFooter />

    </div>
  );
}

export default ExplorarBebidasIngredientes;
