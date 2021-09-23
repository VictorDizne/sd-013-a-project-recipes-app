import React from 'react';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';
import { Link } from 'react-router-dom';

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
