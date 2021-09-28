import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

function ExplorePage() {
  return (
    <>
      <Header title="Explorar" />
      <div className="explore-buttons">
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" data-testid="explore-food">
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;
