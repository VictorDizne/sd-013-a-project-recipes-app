import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ExplorePages.css';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="container">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="buttons"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/bebidas">
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
}

export default ExploreDrinks;
