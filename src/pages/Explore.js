import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ExplorePages.css';
import '../styles/Buttons.css';

const Explore = () => (
  <div>
    <section>
      <Header title="Explorar" />
    </section>
    <div className="container">
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
          className="buttons"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
          className="buttons"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
