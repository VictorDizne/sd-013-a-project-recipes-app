import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function Explorer() {
  return (
    <section>
      <Header name="Explorar" search={ false } />
      <Link to="/explorar/comidas" data-testid="explore-food">
        Explorar Comidas
      </Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">
        Explorar Bebidas
      </Link>
      <LowerMenu />
    </section>
  );
}

export default Explorer;
