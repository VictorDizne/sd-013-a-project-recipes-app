import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar({ history }) {
  return (
    <>
      <Header pageTitle="Explorar" history={ history } />
      <Link to="/explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">Explorar Bebidas</Link>
      <Footer />
    </>
  );
}

Explorar.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
