import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ToExplorePage() {
  return (
    <div>
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <button type="button">
          Explorar Comidas
        </button>
      </Link>

      <Link to="/explorar/bebidas">
        <button type="button">
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ToExplorePage;
