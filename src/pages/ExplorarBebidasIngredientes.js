import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidasIngredientes({ history }) {
  return (
    <>
      <Header pageTitle="Explorar Ingredientes" history={ history } />
      <Footer />
    </>
  );
}

ExplorarBebidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
