import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" hideSearch hideProfile={ false } />
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
      <ComponentFooter />

    </div>
  );
}

export default Explorar;
