import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import style from './explorar.module.scss';

export default function Explorar({ history }) {
  return (
    <>
      <Header pageTitle="Explorar" history={ history } isMeal />
      <main className={ style.explore }>
        <Link to="/explorar/comidas" data-testid="explore-food">
          <span role="img" aria-label="comida">🍽</span>
          {' '}
          Explorar Comidas
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">
          <span role="img" aria-label="bebida">🍸</span>
          {' '}
          Explorar Bebidas
        </Link>
      </main>
      <Footer />
    </>
  );
}

Explorar.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
