import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Bebidas({ history }) {
  return (
    <>
      <Header pageTitle="Bebidas" history={ history } />
      <Footer />
    </>
  );
}

Bebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
