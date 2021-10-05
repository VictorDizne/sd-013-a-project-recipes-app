import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../components';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Main from './styles/ExplorerPage';

const Explorer = () => (
  <Main>

    <Header title="Explorar" />

    <div className="container-button">
      <Link to="/explorar/comidas">
        <Button
          id="explore-food"
          buttonText="Explorar Comidas"
        />
      </Link>

      <Link to="/explorar/bebidas">
        <Button
          id="explore-drinks"
          buttonText="Explorar Bebidas"
        />
      </Link>

    </div>

    <Footer />

  </Main>
);

export default Explorer;
