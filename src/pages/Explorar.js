import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const Explorar = () => (
  <div>
    <HeaderWithoutSearch page="Explorar" />
    <div data-testid="explore-food">
      <Link to="/explorar/comidas">
        <button type="submit">Explorar Comidas</button>
      </Link>
    </div>
    <div data-testid="explore-drinks">
      <Link to="/explorar/bebidas">
        <button type="submit">Explorar Bebidas</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explorar;
