import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" hideSearch hideProfile={ false } />

      <Link to="/explorar/bebidas/ingredientes">Por Ingredientes</Link>
    </div>
  );
}

export default ExplorarBebidas;
