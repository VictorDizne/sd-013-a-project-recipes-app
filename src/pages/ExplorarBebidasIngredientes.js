import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ExplorarBebidasIngredientes({ history }) {
  return (
    <Header pageTitle="Explorar Ingredientes" history={ history } isMeal={ false } />
  );
}

ExplorarBebidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
