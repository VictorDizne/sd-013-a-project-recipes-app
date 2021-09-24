import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ExplorarBebida = () => (
  <div>
    <Link to="/explorar/bebidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    <Footer />
  </div>
);
export default ExplorarBebida;
