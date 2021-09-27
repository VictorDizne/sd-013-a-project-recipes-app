import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <h1>Explore</h1>
      <div className="container">
        <Link to="/explorar/comidas" className="row" data-testid="explore-food">
          Explorar Comidas
        </Link>
        <Link to="/explorar/bebidas" className="row" data-testid="explore-drinks">
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </>
  );
}
export default Explore;
