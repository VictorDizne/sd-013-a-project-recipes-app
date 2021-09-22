import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas " hideSearch hideProfile={ false } />

      <Link to="/explorar/comidas/ingredientes">Por Ingredientes</Link>
    </div>
  );
}

export default ExplorarComidas;
