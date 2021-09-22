import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Bebidas({ history }) {
  return (
    <Header pageTitle="Bebidas" history={ history } />
  );
}

Bebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
