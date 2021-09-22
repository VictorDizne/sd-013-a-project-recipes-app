import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Explorar() {
  return (
    <div>
      <Header title="Explorar Origem" hideSearch hideProfile={ false } />

      <Link to="/explorar/comidas">Explorar Comidas</Link>
      <Link to="/explorar/bebidas">Explorar Bebidas</Link>
    </div>
  );
}

export default Explorar;
