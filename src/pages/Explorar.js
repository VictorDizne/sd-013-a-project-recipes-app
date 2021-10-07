import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';
import './Styles/Explorar.css';

function Explorar() {
  return (
    <div className="explorar-main">
      <Header title="Explorar" hideSearch hideProfile={ false } />
      <div className="container-explorar">
        <div className="Link-container">
          <Link
            className="link"
            data-testid="explore-food"
            to="/explorar/comidas"
          >
            Explorar Comidas
          </Link>
        </div>
        <div className="Link-container">
          <Link
            className="link"
            data-testid="explore-drinks"
            to="/explorar/bebidas"
          >
            Explorar Bebidas
          </Link>
        </div>
      </div>
      <ComponentFooter />
    </div>
  );
}

export default Explorar;
