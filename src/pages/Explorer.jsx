import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../components';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorer = () => (
  <div>

    <Header title="Explorar" />

    <Link to="/comidas">
      <Button
        id="explore-food"
        buttonText="Explorar Comidas"
      />
    </Link>

    <Link to="/bebidas">
      <Button
        id="explore-drinks"
        buttonText="Explorar Bebidas"
      />
    </Link>

    <Footer />

  </div>
);

export default Explorer;
