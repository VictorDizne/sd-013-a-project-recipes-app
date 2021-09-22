import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidasArea({ history }) {
  return (
    <>
      <Header pageTitle="Explorar Origem" history={ history } />
      <Footer />
    </>
  );
}

ExplorarComidasArea.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
