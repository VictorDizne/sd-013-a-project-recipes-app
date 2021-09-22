import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ExplorarBebidas({ history }) {
  return (
    <Header pageTitle="Explorar Bebidas" history={ history } />
  );
}

ExplorarBebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
