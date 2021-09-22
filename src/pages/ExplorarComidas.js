import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas " hideSearch hideProfile={ false } />

      <Link to="/explorar/comidas/ingredientes">Por Ingredientes</Link>
      <ComponentFooter />
    </div>
  );
}

export default ExplorarComidas;
