import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function Explorar() {
  return (
    <div>
      <Header title="Explorar Origem" hideSearch hideProfile={ false } />
      <Link to="/explorar/comidas">Explorar Comidas</Link>
      <Link to="/explorar/bebidas">Explorar Bebidas</Link>
      <ComponentFooter />

    </div>
  );
}

export default Explorar;
