import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const ExplorarBebidas = () => (
  <div>
    <HeaderWithoutSearch page="Explorar Bebidas" />
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="submit"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
    </div>
    <div>
      <Link to="/explorar/bebidas/supreendabebidas">
        <button type="submit" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default ExplorarBebidas;
