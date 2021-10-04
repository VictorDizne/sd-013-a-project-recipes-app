import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/FoodExplore.css';

function Explore() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <div
        className="btn-container"
      >
        <Link to="/explorar/comidas">
          { /* link que leva para a rota /explorar/comidas */ }
          <button
            id="btn"
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          { /* link que leva para a rota /explorar/bebidas */ }
          <button
            id="btn"
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
