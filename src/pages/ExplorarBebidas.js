import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" hideSearch hideProfile={ false } />
      <Link data-testid="explore-by-ingredient" to="/explorar/bebidas/ingredientes">Por Ingredientes</Link>
      <Link data-testid="explore-surprise" to="/">Me Surpreenda!</Link>
      <ComponentFooter />

    </div>
  );
}

export default ExplorarBebidas;
