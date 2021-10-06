import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function Explorer() {
  return (
    <section className="d-flex justify-content-center">
      <div>
        <Header name="Explorar" search={ false } />
        <Link
          className="btn btn-primary stretched-link"
          to="/explorar/comidas"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Link>
        <Link
          className="btn btn-primary stretched-link"
          to="/explorar/bebidas"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Link>
        <LowerMenu />
      </div>
    </section>
  );
}

export default Explorer;
