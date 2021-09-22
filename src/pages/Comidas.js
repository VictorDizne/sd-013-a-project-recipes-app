import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Comidas({ history }) {
  return (
    <>
      <Header pageTitle="Comidas" history={ history } />
      <Footer />
    </>
  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
