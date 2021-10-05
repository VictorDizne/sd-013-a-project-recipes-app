import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ExplorePages.css';

const ExploreFood = () => (
  <div>
    <Header title="Explorar Comidas" />
    <div className="container">
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="buttons"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
          className="buttons"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="explore-surprise"
          className="buttons"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default ExploreFood;
