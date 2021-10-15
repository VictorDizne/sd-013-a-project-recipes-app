import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const Explorar = () => (
  <div className="explorer">
    <div className="explorerHeader">
      <HeaderWithoutSearch page="Explorar" />
      <Link to="/explorar/comidas" />
    </div>
    <div className="explorerBody">
      <br />
      <div>
        <button type="submit" data-testid="explore-food">Explorar Comidas</button>
      </div>
      <div>
        <Link to="/explorar/bebidas">
          <button type="submit" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
      </div>
      <Footer />
    </div>
  </div>
);

export default Explorar;
