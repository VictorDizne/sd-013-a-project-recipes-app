import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas({ history }) {
  return (
    <>
      <Header pageTitle="Explorar Comidas" history={ history } />
      <Footer />
    </>
  );
}

ExplorarComidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
