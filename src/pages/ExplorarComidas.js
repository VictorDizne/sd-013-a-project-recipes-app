import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ExplorarComidas({ history }) {
  return (
    <Header pageTitle="Explorar Comidas" history={ history } />
  );
}

ExplorarComidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
