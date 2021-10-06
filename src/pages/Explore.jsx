import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header />
      <div>

        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food "
          >
            Explorer Food
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorer Drink
          </button>
        </Link>
      </div>
      <Footer />
    </div>

  );
}

export default Explore;
