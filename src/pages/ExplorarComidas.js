import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas " hideSearch hideProfile={ false } />
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-by-area"
        to="/explorar/comidas/area"
      >
        Por Local de Origem
      </Link>
      <Link data-testid="explore-surprise" to="/">Me Surpreenda!</Link>
      <ComponentFooter />
    </div>
  );
}

export default ExplorarComidas;
