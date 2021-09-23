import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidasIngredientes({ history }) {
  return (
    <>
      <Header pageTitle="Explorar Ingredientes" history={ history } isMeal />
      <Footer />
    </>
  );
}

ExplorarComidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
