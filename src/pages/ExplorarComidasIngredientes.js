import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ExplorarComidasIngredientes({ history }) {
  return (
    <Header pageTitle="Explorar Ingredientes" history={ history } isMeal />
  );
}

ExplorarComidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
