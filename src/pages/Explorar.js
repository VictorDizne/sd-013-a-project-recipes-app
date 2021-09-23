import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar({ history }) {
  return (
    <>
      <Header pageTitle="Explorar" history={ history } />
      <Footer />
    </>
  );
}

Explorar.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
